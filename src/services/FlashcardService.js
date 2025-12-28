const flashcardRepository = require('../repositories/FlashcardRepository');
const noteService = require('../services/noteService');
const axios = require('axios');
const { ValidationError } = require('../utils/customErrors');

class FlashcardService {
    async createFlashcard(data) {
        const { noteId, quantity, difficulty } = data;

        if (![5, 10, 15].includes(quantity)) {
            throw new ValidationError('Quantity must be 5, 10, or 15');
        }

        if (![1, 2, 3].includes(difficulty)) {
            throw new ValidationError('Difficulty must be 1, 2, or 3');
        }

        // 1. Fetch Note
        const note = await noteService.getNoteById(noteId);

        // 2. Prepare Unified Text
        let noteContent = `Title: ${note.title}\n\nSummary: ${note.summary}\n\n`;
        if (note.sections && Array.isArray(note.sections)) {
            note.sections.forEach(section => {
                noteContent += `Section: ${section.subtitle}\n${section.content}\n\n`;
            });
        }

        // 3. Call Webhook
        try {
            const response = await axios.post(process.env.CREATE_FLASHCARD_WEBHOOK_URL, {
                data: noteContent,
                quantity: quantity,
                difficulty: difficulty
            });

            const generatedFlashcards = response.data.flashcards;

            // 3. Save Flashcard Set
            const flashcardData = {
                noteId: noteId,
                quantity: quantity,
                difficulty: difficulty,
                flashcards: generatedFlashcards
            };

            return await flashcardRepository.create(flashcardData);

        } catch (error) {
            console.error('Error generating flashcards:', error.message);
            throw new Error('Failed to generate flashcards from AI service');
        }
    }

    async getFlashcardsByNoteId(noteId) {
        return await flashcardRepository.findByNoteId(noteId);
    }

    async getFlashcardById(id) {
        const flashcard = await flashcardRepository.findById(id);
        if (!flashcard) {
            throw new Error('Flashcard not found');
        }
        return flashcard;
    }

    async deleteFlashcard(id) {
        const deleted = await flashcardRepository.deleteById(id);
        if (!deleted) {
            throw new Error('Flashcard not found');
        }
        return { message: 'Flashcard deleted successfully' };
    }

    async deleteFlashcardsByNoteId(noteId) {
        return await flashcardRepository.deleteByNoteId(noteId);
    }
}

module.exports = new FlashcardService();
