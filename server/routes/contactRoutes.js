const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail'); // ඔයාගේ දැනට තියෙන email utility එක
require('dotenv').config();

// @route   POST /api/contact
// @desc    Send contact form message to Admin
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ msg: 'Please fill in all fields' });
    }

    try {
        // Email Template for Admin
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.ADMIN_EMAIL, // Admin ගේ email එක env එකෙන්
            subject: `New Contact Message: ${subject}`,
            html: `
                <h3>You have a new contact request</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </div>
            `
        };

        await sendEmail(mailOptions);
        res.status(200).json({ msg: 'Email sent successfully' });

    } catch (err) {
        console.error("Contact Email Error:", err);
        res.status(500).json({ msg: 'Failed to send message' });
    }
});

module.exports = router;