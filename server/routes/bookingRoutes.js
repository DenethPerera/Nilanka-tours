// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth'); 
const sendEmail = require('../utils/sendEmail'); // <-- REQUIRED for email logic
require('dotenv').config(); // <-- REQUIRED for process.env variables

// Ensure the SIX_DAY_TOUR_ID constant is defined with a REAL MongoDB ObjectId
const SIX_DAY_TOUR_ID = '693e4f966ccc2ceee1739b8d';

// ==========================================================
// @route   GET /api/bookings
// @desc    සියලුම Booking ඉල්ලීම් ලබා ගන්න (Admin Dashboard)
// @access  Private (Requires auth middleware)
// ==========================================================
router.get('/', auth, async (req, res) => {
  try {
    // Populate tourId to get the tour name/title for the dashboard display
    const bookings = await Booking.find().populate('tourId');
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ==========================================================
// @route   POST /api/bookings
// @desc    නව Booking ඉල්ලීමක් ඉදිරිපත් කරන්න (Client Form)
// @access  Public
// ==========================================================
router.post('/', async (req, res) => {
    // Collect data from the frontend
    const { 
        name, 
        email, 
        adults, 
        children, 
        startDate, 
        packageOption, 
        customizationDetails
    } = req.body; 

    
    const booking = new Booking({
        // Correct Mappings: customerName: name, date: startDate
        customerName: name, 
        email: email, 
        adults: adults, 
        children: children,
        date: startDate, 
        
        guests: parseInt(adults) + parseInt(children),
        // Correct usage of the SIX_DAY_TOUR_ID constant
        tourId: packageOption === '6_days' ? SIX_DAY_TOUR_ID : null, 
        specialRequests: customizationDetails,
        status: 'Pending'
    });

  try {
    const newBooking = await booking.save();
    
    // 1. Send Notification Email to Admin
    const adminMailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `NEW BOOKING INQUIRY: ${name}`,
        html: `
            <h3>New Tour Booking Request</h3>
            <p><strong>Customer:</strong> ${name} (${email})</p>
            <p><strong>Option:</strong> ${packageOption === '6_days' ? '6 Days Explorer Package' : 'Customized Tour'}</p>
            <p><strong>Start Date:</strong> ${new Date(startDate).toLocaleDateString()}</p>
            <p><strong>Guests:</strong> ${adults} Adults, ${children} Children</p>
            <p><strong>Details:</strong> ${customizationDetails || 'None provided'}</p>
            <hr>
            <p>Log in to the Admin Dashboard to accept or reject this booking. Booking ID: ${newBooking._id}</p>
        `,
    };

    await sendEmail(adminMailOptions);

    res.status(201).json(newBooking);

  } catch (err) {
    console.error("Booking submission error:", err.message);
    // Send 500 error if save or email fails.
    res.status(500).json({ message: 'Server Error during submission.', error: err.message }); 
  }
});

// ==========================================================
// @route   PATCH /api/bookings/:id
// @desc    Booking status එක වෙනස් කරන්න (Confirmed/Rejected)
// @access  Private (Requires auth middleware)
// ==========================================================
router.patch('/:id', auth, async (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Status field is required for update' });
    }
    
    try {
        // Populate to ensure we get the tour title back for the confirmation email
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id, 
            { status },
            { new: true }
        ).populate('tourId');
        
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        // 2. Send Confirmation Email to the USER if status is Confirmed 
        if (status === 'Confirmed') {
            const userMailOptions = {
                from: process.env.SMTP_USER,
                to: updatedBooking.email, // Send to the customer
                subject: '✅ Your Tour Booking is Confirmed!',
                html: `
                    <h3>Congratulations, ${updatedBooking.customerName}!</h3>
                    <p>Your tour booking (ID: ${updatedBooking._id}) has been confirmed by your guide, Sajith.</p>
                    <p><strong>Tour Option:</strong> ${updatedBooking.tourId ? updatedBooking.tourId.title : 'Customized Tour'}</p>
                    <p><strong>Start Date:</strong> ${new Date(updatedBooking.date).toLocaleDateString()}</p>
                    <hr>
                    <p>Your guide will contact you shortly to finalize the details.</p>
                    <h4>📞 Contact Details for Your Guide:</h4>
                    <p style="font-size: 1.2em; color: #10b981; font-weight: bold;">
                        ${process.env.ADMIN_CONTACT_NUMBER}
                    </p>
                    <p>Please save this number for direct contact.</p>
                `,
            };
            await sendEmail(userMailOptions);
        }

        res.json(updatedBooking);
        
    } catch (err) {
        console.error("Error updating booking status:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;