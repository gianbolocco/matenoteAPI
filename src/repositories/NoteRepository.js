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
        // Ensure we are working with a Note instance or plain object, but here we expect data to construct one or receive one.
        // If the service passes a Note instance, we just assign ID.
        // If it passes data, we might create the instance here.
        // Plan said "Map response to Note model" in Service, so Service might pass a Note object.
        // Let's assume noteData is an object ready to be stored, but we'll assign ID here.

        const newNote = noteData;
        newNote.id = nextId++;
        notes.push(newNote);
        return newNote;
    }
}

module.exports = new NoteRepository();
