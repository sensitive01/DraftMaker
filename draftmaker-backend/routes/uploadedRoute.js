const { uploadArrayToCloudinary } = require('../controller/uploadController');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif',
        'image/webp', 'application/pdf'
    ];

    allowedTypes.includes(file.mimetype)
        ? cb(null, true)
        : cb(new Error("Invalid file type"), false);
};

// Multer Upload (array always)
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

// ONE endpoint → accepts single or multiple
router.post('/cloudinary', upload.array('files', 20), uploadArrayToCloudinary);


module.exports = router;
