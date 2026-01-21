const express = require('express');
const multer = require('multer');
const noteController = require('../controllers/noteController');
const chatController = require('../controllers/chatController');

const router = express.Router();

// Memory storage for multer to get buffer
const storage = multer.memoryStorage();
// Filter for PDF
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit, adjust as needed
    }
});

const audioFilter = (req, file, cb) => {
    const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/x-m4a', 'audio/ogg', 'audio/webm'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only audio files (mp3, wav, m4a, ogg, webm) are allowed!'), false);
    }
};

const uploadAudio = multer({
    storage: storage,
    fileFilter: audioFilter,
    limits: {
        fileSize: 25 * 1024 * 1024 // 25MB limit for audio
    }
});

router.post('/pdf', upload.single('pdf'), noteController.createNoteFromPdf);
router.post('/youtube', noteController.createNoteFromYoutube);
router.post('/audio', uploadAudio.single('file'), noteController.createNoteFromAudio);
router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.delete('/:id', noteController.deleteNote);

router.post('/:id/chat', chatController.chatWithNote)
router.get('/:id/chat', chatController.getChatHistory)

router.post('/:id/mindmap', noteController.createMindmap)

module.exports = router;
