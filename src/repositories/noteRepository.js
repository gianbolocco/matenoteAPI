const Note = require('../models/note');

class NoteRepository {
    async findAll(query) {
        const { limit = 100, page = 1, userId, keyword, sourceType } = query;
        const skip = (page - 1) * limit;

        const filter = {};
        if (userId) {
            filter.userId = userId;
        }
        if (keyword) {
            filter.title = { $regex: keyword, $options: 'i' };
        }
        if (sourceType) {
            filter.sourceType = sourceType;
        }

        const notes = await Note.find(filter).sort({ createDate: -1 }).skip(skip).limit(limit);
        return notes;
    }

    async findById(id) {
        return await Note.findById(id);
    }

    async findByUserId(userId) {
        return await Note.find({ userId: userId }).sort({ createDate: -1 });
    }

    async create(noteData) {
        // noteData should match the schema
        const newNote = new Note(noteData);
        return await newNote.save();
    }

    async deleteById(id) {
        return await Note.findByIdAndDelete(id);
    }

    async updateById(id, updateData) {
        return await Note.findByIdAndUpdate(id, updateData, { new: true });
    }
}

module.exports = new NoteRepository();
