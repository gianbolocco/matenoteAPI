const quizService = require('../services/quizService');

const createQuiz = async (req, res, next) => {
    try {
        const quiz = await quizService.createQuiz(req.body);
        res.status(201).json({
            status: 'success',
            data: { quiz }
        });
    } catch (error) {
        next(error);
    }
};

const getQuizzesByNoteId = async (req, res, next) => {
    try {
        const quizzes = await quizService.getQuizzesByNoteId(req.params.noteId);
        res.status(200).json({
            status: 'success',
            results: quizzes.length,
            data: { quizzes }
        });
    } catch (error) {
        next(error);
    }
};

const getQuizById = async (req, res, next) => {
    try {
        const quiz = await quizService.getQuizById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { quiz }
        });
    } catch (error) {
        next(error);
    }
};

const deleteQuiz = async (req, res, next) => {
    try {
        await quizService.deleteQuiz(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createQuiz,
    getQuizzesByNoteId,
    getQuizById,
    deleteQuiz
};
