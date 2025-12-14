// models/Booking.js

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    // --- Tour Details ---
    tourId: {
        // This is where we link to a Tour document if the '6 Days Explorer Package' is chosen.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        // Note: This is optional, as the user might choose a 'Customized Tour'.
        required: false 
    },
    
    // --- Customer Contact Details ---
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    
    // --- Trip Details ---
    date: {
        type: Date,
        required: true, // The Preferred Start Date
    },
    adults: {
        type: Number,
        required: true,
        min: 1
    },
    children: {
        type: Number,
        required: false,
        default: 0
    },
    
    // --- Customization/Special Requests ---
    // This holds the text from the `customizationDetails` textarea.
    specialRequests: {
        type: String,
        required: false,
    },
    
    // --- Admin & Status ---
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Rejected'], // Restricts the values to these three options
        default: 'Pending',
        required: true
    },
    
    dateSubmitted: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);