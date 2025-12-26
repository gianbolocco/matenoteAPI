const express = require('express');
const multer = require('multer');
const noteController = require('../controllers/NoteController');

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

router.post('/', upload.single('pdf'), noteController.createNoteFromPdf);
router.post('/youtube', noteController.createNoteFromYoutube);
router.get('/', noteController.getAllNotes);

module.exports = router;
