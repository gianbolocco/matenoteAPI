const Note = require('../models/Note');

let notes = [];
let nextId = 1;

class NoteRepository {
    async findAll() {
        return notes;
    }

    async findById(id) {
        return notes.find(n => n.id === id);
    }

    async findByUserId(userId) {
        return notes.filter(n => n.userId === userId);
    }

    async create(noteData) {
        const newNote = noteData;
        newNote.id = nextId++;
        notes.push(newNote);
        return newNote;
    }
}

module.exports = new NoteRepository();
