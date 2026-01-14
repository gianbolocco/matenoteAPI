const quizRepository = require('../repositories/quizRepository');
const noteService = require('../services/noteService');
const axios = require('axios');
const { ValidationError, NotFoundError } = require('../utils/customErrors');

class QuizService {
    async createQuiz(data) {
        const { noteId } = data;

        // 1. Fetch Note
        let noteContent = await noteService.getNoteContentById(noteId);


        // 2. Call Webhook
        try {
            const response = await axios.post(process.env.CREATE_QUIZ_WEBHOOK_URL, {
                data: noteContent,
            });

            const generatedQuestions = response.data.questions;

            // 3. Save Quiz
            const quizData = {
                noteId: noteId,
                questions: generatedQuestions
            };

            const savedQuiz = await quizRepository.create(quizData);

            await noteService.updateNote(noteId, { quizzId: savedQuiz._id });

            return savedQuiz;

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
            throw new NotFoundError('Quiz not found');
        }
        return quiz;
    }

    async deleteQuiz(id) {
        const deleted = await quizRepository.deleteById(id);
        if (!deleted) {
            throw new NotFoundError('Quiz not found');
        }
        return { message: 'Quiz deleted successfully' };
    }
    async deleteQuizzesByNoteId(noteId) {
        return await quizRepository.deleteByNoteId(noteId);
    }
}

module.exports = new QuizService();
