const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({

    flashcards: [{
        question: String,
        answer: String
    }],
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        required: true
    }
});

// Transform output to include id instead of _id
flashcardSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
