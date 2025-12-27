const Note = require('../models/Note');

class NoteRepository {
    async findAll(query) {
        const { limit = 100, page = 1, userId, keyword } = query;
        const skip = (page - 1) * limit;

        const filter = {};
        if (userId) {
            filter.userId = userId;
        }
        if (keyword) {
            filter.title = { $regex: keyword, $options: 'i' };
        }

        const notes = await Note.find(filter).skip(skip).limit(limit);
        return notes;
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
