const mongoose = require('mongoose');

const quizzSchema = new mongoose.Schema({

    questions: [{
        question: String,
        hint: String,
        options: [{
            text: String,
            correct: Boolean
        }]
    }],
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    difficulty: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    }
});

// Transform output to include id instead of _id
quizzSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Quizz', quizzSchema);
