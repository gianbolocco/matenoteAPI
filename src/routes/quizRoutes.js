const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/', quizController.createQuiz);
router.get('/:id', quizController.getQuizById);
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;
