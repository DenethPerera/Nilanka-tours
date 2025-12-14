// models/Tour.js

const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true // Tour Card එකේ Image URL එක
    },
    locations: {
        type: [String], // Array of strings (e.g., ['Kandy', 'Ella'])
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tour', TourSchema);