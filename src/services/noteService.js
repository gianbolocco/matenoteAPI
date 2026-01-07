const axios = require('axios');
const FormData = require('form-data');
const noteRepository = require('../repositories/NoteRepository');
const { AppError, ValidationError, NotFoundError } = require('../utils/customErrors'); // Assuming these exist, checked customErrors.js availability in previous steps


class NoteService {
    async createNoteFromPdf(file, userId) {
        if (!file) {
            throw new ValidationError('PDF file is required');
        }
        if (!userId) {
            throw new ValidationError('User ID is required');
        }

        const fileBuffer = file.buffer;
        const originalName = file.originalname;
        if (!fileBuffer) {
            throw new ValidationError('No file buffer provided');
        }

        try {
            const formData = new FormData();
            formData.append('pdf', fileBuffer, originalName);

            const webhookUrl = process.env.CREATE_NOTE_FROM_PDF_WEBHOOK_URL;

            const response = await axios.post(webhookUrl, formData, {
                headers: {
                    ...formData.getHeaders()
                }
            });

            const data = response.data;

            // Validate response structure (basic check)
            if (!data.title || !data.summary || !data.sections) {
                throw new AppError('Invalid response from processing service', 502);
            }

            const newNote = {
                title: data.title,
                summary: data.summary,
                sections: data.sections,
                source: originalName,
                sourceType: 'pdf',
                userId: userId // Assuming userId is passed as ObjectId string or compatible
            };

            // Save to repository
            const savedNote = await noteRepository.create(newNote);
            return savedNote;

        } catch (error) {
            if (error instanceof ValidationError || error instanceof AppError) {
                throw error;
            }

            let errorMessage = error.message;
            if (error.response) {
                const remoteMsg = error.response.data ? (error.response.data.message || JSON.stringify(error.response.data)) : error.response.statusText;
                errorMessage = `External service error ${error.response.status}: ${remoteMsg}`;
                throw new AppError(errorMessage, 502);
            } else if (error.request) {
                errorMessage = 'No response received from external service';
                throw new AppError(errorMessage, 504); // Gateway Timeout
            }

            // Wrap other errors
            throw new AppError(`Failed to process note: ${errorMessage}`, 500);
        }
    }

    async createNoteFromYoutube(link, userId) {
        if (!link) {
            throw new ValidationError('YouTube link is required');
        }
        if (!userId) {
            throw new ValidationError('User ID is required');
        }

        // Regex to extract YouTube ID
        // Handles:
        // - https://www.youtube.com/watch?v=VIDEO_ID
        // - https://youtu.be/VIDEO_ID
        // - https://www.youtube.com/embed/VIDEO_ID
        const videoIdMatch = link.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);

        if (!videoIdMatch) {
            throw new ValidationError('Invalid YouTube link');
        }

        const videoId = videoIdMatch[1];

        try {
            const webhookUrl = process.env.CREATE_NOTE_FROM_YOUTUBE_WEBHOOK_URL;

            const response = await axios.post(webhookUrl, {
                id: videoId
            });

            const data = response.data;

            // Validate response structure
            if (!data.title || !data.summary || !data.sections) {
                throw new AppError('Invalid response from processing service', 502);
            }

            const newNote = {
                title: data.title,
                summary: data.summary,
                sections: data.sections,
                source: link,
                sourceType: 'youtube',
                userId: userId
            };

            // Save to repository
            const savedNote = await noteRepository.create(newNote);
            return savedNote;

        } catch (error) {
            if (error instanceof ValidationError || error instanceof AppError) {
                throw error;
            }

            let errorMessage = error.message;
            if (error.response) {
                const remoteMsg = error.response.data ? (error.response.data.message || JSON.stringify(error.response.data)) : error.response.statusText;
                errorMessage = `External service error ${error.response.status}: ${remoteMsg}`;
                throw new AppError(errorMessage, 502);
            } else if (error.request) {
                errorMessage = 'No response received from external service';
                throw new AppError(errorMessage, 504);
            }

            throw new AppError(`Failed to process YouTube note: ${errorMessage}`, 500);
        }
    }

    async getAllNotes(query) {
        return noteRepository.findAll(query);
    }

    async getNoteById(id) {
        const note = await noteRepository.findById(id);
        if (!note) {
            throw new NotFoundError(`Note with ID ${id} not found`);
        }
        return note;
    }

    async deleteNote(id) {
        const note = await noteRepository.findById(id);
        if (!note) {
            throw new NotFoundError(`Note with ID ${id} not found`);
        }

        return noteRepository.deleteById(id);
    }

    async getNoteContentById(id) {
        const note = await noteRepository.findById(id);
        if (!note) {
            throw new NotFoundError(`Note with ID ${id} not found`);
        }
        let noteContent = `Title: ${note.title}\n\nSummary: ${note.summary}\n\n`;
        if (note.sections && Array.isArray(note.sections)) {
            note.sections.forEach(section => {
                noteContent += `Section: ${section.subtitle}\n${section.content}\n\n`;
            });
        }
        return noteContent;
    }

}

module.exports = new NoteService();
