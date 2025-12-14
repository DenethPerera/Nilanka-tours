const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const GalleryImage = require('../models/GalleryImage');
const auth = require('../middleware/auth'); // Admin විතරක් upload කරන්න

// Multer Storage Engine (පින්තූර save වන තැන)
const storage = multer.diskStorage({
  destination: './uploads/', // Server එකේ 'uploads' ෆෝල්ඩරයට යයි
  filename: function(req, file, cb){
    cb(null, 'gallery-' + Date.now() + path.extname(file.originalname));
  }
});

// File Type Check
const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/; // Allow only images
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
}

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image'); // Frontend එකෙන් එන field name එක 'image' විය යුතුයි

// @route   POST /api/gallery
// @desc    Upload a new image (Admin only)
router.post('/', auth, (req, res) => {
  upload(req, res, async (err) => {
    if(err){
      return res.status(400).json({ msg: err });
    } else {
      if(req.file == undefined){
        return res.status(400).json({ msg: 'No file selected!' });
      } else {
        // Save path to Database
        try {
            const newImage = new GalleryImage({
                imageUrl: `/uploads/${req.file.filename}`, // Save path
                category: req.body.category || 'General'
            });
            await newImage.save();
            res.json(newImage);
        } catch (error) {
            res.status(500).send('Server Error');
        }
      }
    }
  });
});

// @route   GET /api/gallery
// @desc    Get all images
router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 }); // අලුත් ඒවා උඩින්
    res.json(images);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;