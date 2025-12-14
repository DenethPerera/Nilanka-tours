const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary'); 
const GalleryImage = require('../models/GalleryImage');
const auth = require('../middleware/auth'); 


const upload = multer({
    storage: storage, 
    limits: { fileSize: 5000000 }, 
    
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(file.originalname.toLowerCase().split('.').pop());
        const mimetype = filetypes.test(file.mimetype);
        if(mimetype && extname){
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
}).single('image'); 


router.post('/', auth, (req, res) => {
    upload(req, res, async (err) => {
        // --- 1. HANDLE UPLOAD ERRORS (Multer/Cloudinary) ---
        if (err instanceof multer.MulterError) {
            // e.g., File too large (LIMIT_FILE_SIZE)
            console.error("Multer Error:", err.message);
            return res.status(400).json({ msg: `Upload Error: ${err.message}` });
        } else if (err) {
            // e.g., 'Error: Images Only!' from fileFilter
            console.error("General Upload Error:", err);
            return res.status(400).json({ msg: err });
        }

        // --- 2. CHECK FOR FILE ---
        // If the file is undefined, it means no file was selected
        if (req.file == undefined) {
            return res.status(400).json({ msg: 'No file selected!' });
        }

        // --- 3. SAVE TO DATABASE (File is now on Cloudinary) ---
        try {
            // req.file.path or req.file.secure_url contains the Cloudinary URL
            const newImage = new GalleryImage({
                imageUrl: req.file.path || req.file.secure_url,
                category: req.body.category || 'General'
            });
            await newImage.save();
            
            // Log success and return the newly saved image
            console.log("Image successfully uploaded to Cloudinary and saved to DB.");
            res.json(newImage);

        } catch (error) {
            console.error("Database Save Error:", error.message);
            res.status(500).send('Server Error during database save.');
        }
    });
});


router.get('/', async (req, res) => {
    try {
        const images = await GalleryImage.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;