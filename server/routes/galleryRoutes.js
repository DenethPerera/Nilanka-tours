const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // 🔥 Cloudinary Storage Engine එක මෙතනට ගන්නවා
const GalleryImage = require('../models/GalleryImage');
const auth = require('../middleware/auth'); // Admin විතරක් upload කරන්න

// Init Upload (Cloudinary Storage පාවිච්චි කරලා)
const upload = multer({
    storage: storage, // 🔥 Local Storage එක අයින් කරලා Cloudinary Storage එක දැම්මා
    limits: { fileSize: 5000000 }, // 5MB limit
    // File Type Check එක CloudinaryStorage එකේදී params හරහා කළ හැක, නමුත් මේක ආරක්ෂිතයි
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
}).single('image'); // Frontend එකෙන් එන field name එක 'image' විය යුතුයි

// @route   POST /api/gallery
// @desc    Upload a new image (Admin only)
router.post('/', auth, (req, res) => {
    upload(req, res, async (err) => {
        if(err){
            // Multer error or File size error
            console.error("Multer/Cloudinary Upload Error:", err);
            return res.status(400).json({ msg: err });
        }
        
        // req.file නැත්නම් (no file selected)
        if(req.file == undefined){
            return res.status(400).json({ msg: 'No file selected!' });
        }
        
        // 🔥 req.file.path වෙනුවට req.file.path or req.file.secure_url එකෙන් Cloudinary URL එක ගන්නවා
        try {
            const newImage = new GalleryImage({
                // Cloudinary වෙතින් ලැබෙන URL එක Save කරන්න
                imageUrl: req.file.path || req.file.secure_url, 
                category: req.body.category || 'General'
            });
            await newImage.save();
            res.json(newImage);
        } catch (error) {
            console.error("Database Save Error:", error);
            res.status(500).send('Server Error');
        }
    });
});

// @route   GET /api/gallery
// @desc    Get all images (මෙතන වෙනස් කරන්න දෙයක් නෑ)
router.get('/', async (req, res) => {
    try {
        const images = await GalleryImage.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;