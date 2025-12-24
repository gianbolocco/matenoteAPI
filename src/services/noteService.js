const axios = require('axios');
const FormData = require('form-data');
const Note = require('../models/Note');
const noteRepository = require('../repositories/NoteRepository');
const { AppError, ValidationError } = require('../utils/customErrors'); // Assuming these exist, checked customErrors.js availability in previous steps

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

            const webhookUrl = process.env.CREATE_NOTE_FROM_PDF_WEBHOOK_URL_TEST;

            const response = await axios.post(webhookUrl, formData, {
                headers: {
                    ...formData.getHeaders()
                }
            });

            const data = response.data;

            // Validate response structure (basic check)
            if (!data.title || !data.summary || !data.sections) {
                // If webhook fails to return expected structure, we might want to throw or handle gracefully.
                // Assuming success path for now.
                throw new AppError('Invalid response from processing service', 502);
            }

            // Map response to Note model
            // Note constructor: (title, summary, sections, content, source, sourceType, userId)
            // The webhook returns 'title', 'summary', 'sections'.
            // Source is the filename (originalName).
            // SourceType is 'pdf'.
            // Content is not explicitly returned by webhook as a single string, but 'sections' has content. 
            // We'll leave 'content' field empty or derived if needed, but Model constructor had it. 
            // Let's check Model definition again.
            // Model: constructor(title, summary, sections, content, source, sourceType, userId)
            // Wait, I put 'content' in the constructor in previous step? 
            // Let me check my own previous tool call for Note.js.
            // Yes: constructor(title, summary, sections, content, source, sourceType, userId)
            // But user request JSON example didn't have a main 'content' field, just within sections.
            // I'll pass null or empty string for 'content' parameter if it's not applicable, or maybe I made a mistake in Model.
            // User request JSON: { title, summary, sections: [...] }
            // I will assume specific 'content' field is strictly for the note's main text if not using sections, but here we have sections.
            // I'll just pass null for content.

            const newNote = new Note(
                data.title,
                data.summary,
                data.sections,
                null, // content
                originalName, // source
                'pdf', // sourceType
                parseInt(userId)
            );

            // Save to repository
            const savedNote = await noteRepository.create(newNote);
            return savedNote;

        } catch (error) {
            if (error instanceof ValidationError || error instanceof AppError) {
                throw error;
            }

            let errorMessage = error.message;
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Webhook Error Response:', error.response.data);
                console.error('Webhook Error Status:', error.response.status);
                // Try to get a meaningful message from the response if possible, otherwise use status text
                const remoteMsg = error.response.data ? (error.response.data.message || JSON.stringify(error.response.data)) : error.response.statusText;
                errorMessage = `External service error ${error.response.status}: ${remoteMsg}`;
                // We might want to pass the 500 status code from the external service to our client if it's a 500
                // Or wrap it in a 502 Bad Gateway if it's an upstream error. 502 is semantically better for "upstream error".
                throw new AppError(errorMessage, 502);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Webhook No Response:', error.request);
                errorMessage = 'No response received from external service';
                throw new AppError(errorMessage, 504); // Gateway Timeout
            }

            // Wrap other errors
            throw new AppError(`Failed to process note: ${errorMessage}`, 500);
        }
    }

    async getAllNotes() {
        return noteRepository.findAll();
    }
}

module.exports = new NoteService();
