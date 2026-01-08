const mongoose = require('mongoose');

const chat = new mongoose.Schema({

    messages: [{
        role: {
            type: String,
            enum: ['user', 'assistant'],
            required: true
        },
        content: String,
        _id: false
    }],
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Transform output to include id instead of _id
chat.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Chat', chat);
