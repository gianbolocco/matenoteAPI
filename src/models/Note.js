const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    sections: [{
        subtitle: String,
        content: String,
        highlights: [String]
    }],
    source: {
        type: String,
        required: true
    },
    sourceType: {
        type: String,
        required: true,
        enum: ['pdf', 'youtube']
    },
    userId: {
        type: Number, // Keeping Number as requested for now, or should be ObjectId? Plan said Number/ObjectId.
        // User repository uses auto-incrementing ID (now switching to Mongo so it will be ObjectId).
        // If User becomes Mongoose model, its ID will be ObjectId.
        // So this should probably be ObjectId.
        // BUT the plan mentioned checking if services rely on int.
        // Services receive userId from request. I'll make it Mixed or String to be safe during migration,
        // or better, if I migrate User to Mongo, it WILL be ObjectId.
        // The previous code had `parseInt(userId)`.
        // I will change this to Schema.Types.ObjectId to link with User properly.
        // Wait, if I change User to Mongo, the IDs will be generated as ObjectIds.
        // So I should use ObjectId here.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

// Transform output to include id instead of _id
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Note', noteSchema);
