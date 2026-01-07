const express = require('express');
const router = express.Router();
const quizController = require('../controllers/QuizController');

router.post('/', quizController.createQuiz);
router.get('/note/:noteId', quizController.getQuizzesByNoteId);
router.get('/:id', quizController.getQuizById);
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;
