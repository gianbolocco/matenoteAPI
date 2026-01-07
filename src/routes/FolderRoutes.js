const express = require('express');
const router = express.Router();
const folderController = require('../controllers/FolderController.js');

router.post('/users/:userId/folders', folderController.createFolder);
router.get('/users/:userId/folders', folderController.getFoldersByUserId);
router.get('/folders/:id', folderController.getFolderById);
router.delete('/folders/:id', folderController.deleteFolder);

router.post('/folders/:id/notes', folderController.addNoteToFolder);
router.delete('/folders/:id/notes/:noteId', folderController.removeNoteFromFolder);

router.patch('/folders/:id', folderController.updateFolder);

module.exports = router;
