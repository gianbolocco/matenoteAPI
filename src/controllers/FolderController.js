const folderService = require('../services/FolderService.js');

const createFolder = async (req, res, next) => {
    try {
        const folder = await folderService.createFolder(req.params.userId, req.body);
        res.status(201).json({
            status: 'success',
            data: { folder }
        });
    } catch (error) {
        next(error);
    }
};

const getFoldersByUserId = async (req, res, next) => {
    try {
        const folders = await folderService.getFoldersByUserId(req.params.userId);
        res.status(200).json({
            status: 'success',
            results: folders.length,
            data: { folders }
        });
    } catch (error) {
        next(error);
    }
};

const getFolderById = async (req, res, next) => {
    try {
        const folder = await folderService.getFolderById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { folder }
        });
    } catch (error) {
        next(error);
    }
};

const deleteFolder = async (req, res, next) => {
    try {
        await folderService.deleteFolder(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

const updateFolder = async (req, res, next) => {
    try {
        const folder = await folderService.updateFolder(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            data: { folder }
        });
    } catch (error) {
        next(error);
    }
};

const addNoteToFolder = async (req, res, next) => {
    try {
        const folder = await folderService.addNoteToFolder(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            data: { folder }
        });
    } catch (error) {
        next(error);
    }
};

const removeNoteFromFolder = async (req, res, next) => {
    try {
        const folder = await folderService.removeNoteFromFolder(req.params.id, req.params.noteId);
        res.status(200).json({
            status: 'success',
            data: { folder }
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createFolder,
    getFoldersByUserId,
    getFolderById,
    deleteFolder,
    updateFolder,
    addNoteToFolder,
    removeNoteFromFolder
};
