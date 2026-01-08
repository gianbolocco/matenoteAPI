const Flashcard = require('../models/flashcard');

class FlashcardRepository {
    async create(flashcardData) {
        const flashcard = new Flashcard(flashcardData);
        return await flashcard.save();
    }

    async findByNoteId(noteId) {
        return await Flashcard.find({ noteId: noteId });
    }

    async findById(id) {
        return await Flashcard.findById(id);
    }

    async deleteById(id) {
        return await Flashcard.findByIdAndDelete(id);
    }

    async deleteByNoteId(noteId) {
        return await Flashcard.deleteMany({ noteId: noteId });
    }
}

module.exports = new FlashcardRepository();
