const axios = require('axios');
const FormData = require('form-data');
const noteRepository = require('../repositories/noteRepository');
const { AppError, ValidationError, NotFoundError } = require('../utils/customErrors');
const userService = require('./userService');


class NoteService {
    async createNoteFromPdf(file, body) {
        let { userId, interest } = body;
        if (!file) throw new ValidationError('PDF file is required');
        if (!userId) throw new ValidationError('User ID is required');

        const formData = new FormData();
        formData.append('pdf', file.buffer, file.originalname);
        if (!interest) interest = 'no interest';
        formData.append('interest', interest);

        return this._processNoteCreation(
            process.env.CREATE_NOTE_FROM_PDF_WEBHOOK_URL,
            formData,
            formData.getHeaders(),
            {
                source: file.originalname,
                sourceType: 'pdf',
                userId,
                interest
            }
        );
    }

    async createNoteFromYoutube(body) {
        let { link, userId, interest } = body;
        if (!link) throw new ValidationError('YouTube link is required');
        if (!userId) throw new ValidationError('User ID is required');

        const videoIdMatch = link.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (!videoIdMatch) throw new ValidationError('Invalid YouTube link');

        const videoId = videoIdMatch[1];
        const payload = { id: videoId };
        if (!interest) interest = 'no interest';
        payload.interest = interest;

        return this._processNoteCreation(
            process.env.CREATE_NOTE_FROM_YOUTUBE_WEBHOOK_URL,
            payload,
            {},
            {
                source: link,
                sourceType: 'youtube',
                userId,
                interest
            }
        );
    }

    async createNoteFromAudio(file, body) {
        let { userId, interest } = body;
        if (!file) throw new ValidationError('Audio file is required');
        if (!userId) throw new ValidationError('User ID is required');

        const formData = new FormData();
        formData.append('file', file.buffer, file.originalname);
        if (!interest) interest = 'no interest';
        formData.append('interest', interest);

        return this._processNoteCreation(
            process.env.CREATE_NOTE_FROM_AUDIO_WEBHOOK_URL,
            formData,
            formData.getHeaders(),
            {
                source: file.originalname,
                sourceType: 'audio',
                userId,
                interest
            }
        );
    }

    async createNoteFromText(body) {
        let { text, userId, interest } = body;
        if (!text) throw new ValidationError('Text is required');
        if (!userId) throw new ValidationError('User ID is required');

        const payload = { text };
        if (!interest) interest = 'no interest';
        payload.interest = interest;

        return this._processNoteCreation(
            process.env.CREATE_NOTE_FROM_TEXT_WEBHOOK_URL,
            payload,
            {},
            {
                source: 'text',
                sourceType: 'text',
                userId,
                interest
            }
        );
    }

    async _processNoteCreation(webhookUrl, payload, headers, noteInfo) {
        try {
            const response = await axios.post(webhookUrl, payload, { headers });
            const data = response.data;

            if (!data.title || !data.summary || (!data.sections && !data.units)) {
                throw new AppError('Invalid response from processing service', 502);
            }

            const transformSection = (s) => {
                if (s.type === 'BULLET_LIST') return { ...s, type: 'LIST', content: { ...s.content, style: 'default' } };
                if (s.type === 'MANTRAS') return { ...s, type: 'LIST', content: { ...s.content, style: 'mantra' } };
                return s;
            };

            const units = data.units
                ? data.units.map(u => ({ ...u, sections: u.sections.map(transformSection) }))
                : [{
                    title: 'General',
                    sections: data.sections.map(transformSection)
                }];

            const newNote = {
                title: data.title,
                summary: data.summary,
                units: units,
                source: noteInfo.source,
                sourceType: noteInfo.sourceType,
                userId: noteInfo.userId,
                interest: noteInfo.interest
            };

            const createdNote = await noteRepository.create(newNote);

            return createdNote;

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

            throw new AppError(`Failed to process note: ${errorMessage}`, 500);
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

        if (note.units && Array.isArray(note.units)) {
            note.units.forEach(unit => {
                if (unit.title) noteContent += `Unit: ${unit.title}\n\n`;

                if (unit.sections && Array.isArray(unit.sections)) {
                    unit.sections.forEach(section => {
                        noteContent += `Section: ${section.subtitle || 'Untitled'}\n`;

                        switch (section.type) {
                            case 'TEXT':
                                if (section.content.text) noteContent += `${section.content.text}\n`;
                                if (section.content.highlights && section.content.highlights.length > 0) {
                                    noteContent += `Highlights:\n- ${section.content.highlights.join('\n- ')}\n`;
                                }
                                break;
                            case 'LIST':
                                if (section.content.style === 'mantra') {
                                    noteContent += `[Mantra]\n`;
                                }
                                if (section.content.items) {
                                    noteContent += `- ${section.content.items.join('\n- ')}\n`;
                                }
                                break;
                            case 'TABLE':
                                if (section.content.title) noteContent += `Table: ${section.content.title}\n`;
                                if (section.content.rows && Array.isArray(section.content.rows)) {
                                    section.content.rows.forEach(row => {
                                        // Handle Mongoose Map or POJO
                                        const rowObj = (row instanceof Map) ? Object.fromEntries(row) : row;
                                        noteContent += JSON.stringify(rowObj) + '\n';
                                    });
                                }
                                break;
                            case 'CODE':
                                if (section.content.explanation) {
                                    noteContent += `Explanation: ${section.content.explanation}\n`;
                                }
                                noteContent += `\`\`\`${section.content.language || ''}\n${section.content.code}\n\`\`\`\n`;
                                break;
                            default:
                                noteContent += JSON.stringify(section.content) + '\n';
                        }
                        noteContent += '\n';
                    });
                }
            });
        }
        return noteContent;
    }


    async createMindmap(noteId) {
        const noteContent = await this.getNoteContentById(noteId);

        try {
            const webhookUrl = process.env.CREATE_MINDMAP_WEBHOOK_URL;
            if (!webhookUrl) {
                throw new AppError('CREATE_MINDMAP_WEBHOOK_URL is not defined', 500);
            }

            // Call the webhook with the note content
            const response = await axios.post(webhookUrl, {
                noteContent: noteContent
            });

            let mindmapData = response.data;

            if (mindmapData && mindmapData.message === 'Workflow was started') {
                throw new AppError('Webhook returned "Workflow was started". Please configure it to "Respond to Webhook" or "Wait for Completion".', 502);
            }

            // Handle case where response is a string (e.g. webhook returns text/plain)
            if (typeof mindmapData === 'string') {
                try {
                    // Try to extract JSON from string if it's wrapped in code blocks or similar
                    const match = mindmapData.match(/\[.*\]|\{.*\}/s);
                    if (match) {
                        mindmapData = JSON.parse(match[0]);
                    } else {
                        mindmapData = JSON.parse(mindmapData);
                    }
                } catch (e) {
                    console.error('Failed to parse mindmap response:', mindmapData);
                    // Keep original data or throw? For now let's keep original but it might be the issue
                }
            }

            // Update the note with the received mindmap data
            const updatedNote = await noteRepository.updateById(noteId, {
                mindmap: mindmapData
            });

            if (!updatedNote) {
                throw new NotFoundError(`Note with ID ${noteId} not found for update`);
            }

            return updatedNote.mindmap;

        } catch (error) {
            if (error instanceof AppError || error instanceof NotFoundError) {
                throw error;
            }

            let errorMessage = error.message;
            if (error.response) {
                const remoteMsg = error.response.data ? (error.response.data.message || JSON.stringify(error.response.data)) : error.response.statusText;
                errorMessage = `External mindmap service error ${error.response.status}: ${remoteMsg}`;
                throw new AppError(errorMessage, 502);
            }

            throw new AppError(`Failed to create mindmap: ${errorMessage}`, 500);
        }
    }

    async updateNote(id, data) {
        const updatedNote = await noteRepository.updateById(id, data);
        if (!updatedNote) {
            throw new NotFoundError(`Note with ID ${id} not found`);
        }
        return updatedNote;
    }
}


module.exports = new NoteService();
