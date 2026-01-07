const flashcardService = require('../services/FlashcardService');

const createFlashcard = async (req, res, next) => {
    try {
        const flashcard = await flashcardService.createFlashcard(req.body);
        res.status(201).json({
            status: 'success',
            data: { flashcard }
        });
    } catch (error) {
        next(error);
    }
};

const getFlashcardsByNoteId = async (req, res, next) => {
    try {
        const flashcards = await flashcardService.getFlashcardsByNoteId(req.params.noteId);
        res.status(200).json({
            status: 'success',
            results: flashcards.length,
            data: { flashcards }
        });
    } catch (error) {
        next(error);
    }
};

const getFlashcardById = async (req, res, next) => {
    try {
        const flashcard = await flashcardService.getFlashcardById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { flashcard }
        });
    } catch (error) {
        next(error);
    }
};

const deleteFlashcard = async (req, res, next) => {
    try {
        await flashcardService.deleteFlashcard(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createFlashcard,
    getFlashcardsByNoteId,
    getFlashcardById,
    deleteFlashcard
};
