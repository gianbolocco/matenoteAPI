const noteService = require('../services/noteService');
const { ValidationError } = require('../utils/customErrors');

const createNoteFromPdf = async (req, res, next) => {
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

const createNoteFromYoutube = async (req, res, next) => {
    try {
        const { link, userId } = req.body;
        const newNote = await noteService.createNoteFromYoutube(link, userId);

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
        const notes = await noteService.getAllNotes(req.query);
        res.status(200).json({
            status: 'success',
            results: notes.length,
            data: { notes }
        });
    } catch (error) {
        next(error);
    }
};

const getNoteById = async (req, res, next) => {
    try {
        const note = await noteService.getNoteById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { note }
        });
    } catch (error) {
        next(error);
    }
};

const deleteNote = async (req, res, next) => {
    try {
        await noteService.deleteNote(req.params.id);
        res.status(204).json({
            status: 'success'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createNoteFromPdf,
    createNoteFromYoutube,
    getAllNotes,
    getNoteById,
    deleteNote
};
