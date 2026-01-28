const noteService = require('../services/noteService');
const flashcardService = require('../services/flashcardService');
const quizService = require('../services/quizService');
const chatService = require('../services/chatService');
const folderService = require('../services/folderService');

const { ValidationError } = require('../utils/customErrors');

const createNoteFromPdf = async (req, res, next) => {
    try {
        const newNote = await noteService.createNoteFromPdf(req.file, req.body);

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
        const newNote = await noteService.createNoteFromYoutube(req.body);

        res.status(201).json({
            status: 'success',
            data: { note: newNote }
        });
    } catch (error) {
        next(error);
    }
};

const createNoteFromAudio = async (req, res, next) => {
    try {
        const newNote = await noteService.createNoteFromAudio(req.file, req.body);

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
        const noteId = req.params.id;
        await noteService.deleteNote(noteId);

        await folderService.deleteNoteFromFolders(noteId);
        await chatService.deleteChatsByNoteId(noteId);
        await flashcardService.deleteFlashcardsByNoteId(noteId);
        await quizService.deleteQuizzesByNoteId(noteId);

        res.status(204).json({
            status: 'success'
        });
    } catch (error) {
        next(error);
    }
};

const updateNote = async (req, res, next) => {
    try {
        const updatedNote = await noteService.updateNote(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            data: { note: updatedNote }
        });
    } catch (error) {
        next(error);
    }
};

const createMindmap = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const mindmap = await noteService.createMindmap(noteId);
        res.status(201).json({
            status: 'success',
            data: { mindmap }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createNoteFromPdf,
    createNoteFromYoutube,
    createNoteFromAudio,
    getAllNotes,
    updateNote,
    getNoteById,
    deleteNote,
    createMindmap
};
