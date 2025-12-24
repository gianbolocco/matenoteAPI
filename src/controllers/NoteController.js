const noteService = require('../services/noteService');
const { ValidationError } = require('../utils/customErrors');

const createNote = async (req, res, next) => {
    try {
        // Delegate validation and processing to service
        const newNote = await noteService.createNoteFromPdf(req.file, req.body.userId);

        res.status(201).json({
            status: 'success',
            data: { note: newNote }
        });
    } catch (error) {
        next(error);
    }
};

const getAllNotes = async (req, res, next) => {
    try {
        const notes = await noteService.getAllNotes();
        res.status(200).json({
            status: 'success',
            results: notes.length,
            data: { notes }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createNote,
    getAllNotes
};
