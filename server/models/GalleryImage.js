const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'General'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);