const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcardController');

router.post('/', flashcardController.createFlashcard);
router.get('/:id', flashcardController.getFlashcardById);
router.delete('/:id', flashcardController.deleteFlashcard);

module.exports = router;
