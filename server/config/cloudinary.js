const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 1. Cloudinary සම්බන්ධ කිරීම
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Storage Engine එක සැකසීම
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sajith-tours', // Cloudinary එකේ හැදෙන ෆෝල්ඩරයේ නම
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Upload කළ හැකි වර්ග
  },
});

module.exports = { cloudinary, storage };