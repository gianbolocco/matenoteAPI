const quizRepository = require('../repositories/QuizRepository');
const noteService = require('../services/noteService');
const axios = require('axios');
const { ValidationError } = require('../utils/customErrors');

class QuizService {
    async createQuiz(data) {
        const { noteId, quantity, difficulty } = data;

        if (![5, 10, 15].includes(quantity)) {
            throw new ValidationError('Quantity must be 5, 10, or 15');
        }

        if (![1, 2, 3].includes(difficulty)) {
            throw new ValidationError('Difficulty must be 1, 2, or 3');
        }

        // 1. Fetch Note
        const note = await noteService.getNoteById(noteId);
        if (!note) {
            throw new Error('Note not found');
        }

        let noteContent = `Title: ${note.title}\n\nSummary: ${note.summary}\n\n`;
        if (note.sections && Array.isArray(note.sections)) {
            note.sections.forEach(section => {
                noteContent += `Section: ${section.subtitle}\n${section.content}\n\n`;
            });
        }

        // 2. Call Webhook
        try {
            const response = await axios.post(process.env.CREATE_QUIZ_WEBHOOK_URL, {
                data: noteContent,
                quantity: quantity,
                difficulty: difficulty
            });

            const generatedQuestions = response.data.questions;

            // 3. Save Quiz
            const quizData = {
                noteId: noteId,
                quantity: quantity,
                difficulty: difficulty,
                questions: generatedQuestions
            };

            return await quizRepository.create(quizData);

        } catch (error) {
            console.error('Error generating quiz:', error.message);
            throw new Error('Failed to generate quiz from AI service');
        }
    }

    async getQuizzesByNoteId(noteId) {
        return await quizRepository.findByNoteId(noteId);
    }

    async getQuizById(id) {
        const quiz = await quizRepository.findById(id);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        return quiz;
    }

    async deleteQuiz(id) {
        const deleted = await quizRepository.deleteById(id);
        if (!deleted) {
            throw new Error('Quiz not found');
        }
        return { message: 'Quiz deleted successfully' };
    }
}

module.exports = new QuizService();
