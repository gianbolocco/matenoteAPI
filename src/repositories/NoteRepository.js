const Note = require('../models/Note');

class NoteRepository {
    async findAll() {
        return await Note.find({});
    }

    async findById(id) {
        return await Note.findById(id);
    }

    async findByUserId(userId) {
        return await Note.find({ userId: userId });
    }

    async create(noteData) {
        // noteData should match the schema
        const newNote = new Note(noteData);
        return await newNote.save();
    }

    async deleteById(id) {
        return await Note.findByIdAndDelete(id);
    }
}

module.exports = new NoteRepository();
