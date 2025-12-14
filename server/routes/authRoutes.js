// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Imports the User model
const bcrypt = require('bcryptjs'); // For password comparison
const jwt = require('jsonwebtoken'); // For generating tokens
require('dotenv').config();

// @route POST /api/auth/login
// @desc Handle Admin Login and issue JWT token
// @access Public

router.post('/login', async (req, res) => {
    // 1. Log what the frontend sent
    console.log("-----------------------------------------");
    console.log("🔍 LOGIN ATTEMPT RECEIVED");
    console.log("📥 Incoming Body:", req.body); 

    const { username, password } = req.body;

    try {
        // 2. Log the search query
        console.log(`🔎 Searching DB for username: "${username}"`);
        
        const user = await User.findOne({ username });

        // 3. Log if user was found
        if (!user) {
            console.log("❌ ERROR: User NOT found in database.");
            return res.status(400).json({ msg: 'Invalid Credentials (User not found)' });
        }
        console.log("✅ User found in DB. ID:", user._id);
        console.log("🔐 Hashed Password in DB:", user.password);

        // 4. Log the password comparison result
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            console.log("❌ ERROR: Password mismatch. The entered password does not match the hash.");
            return res.status(400).json({ msg: 'Invalid Credentials (Password wrong)' });
        }

        console.log("✅ SUCCESS: Password matches! generating token...");

        // Payload
        const payload = { user: { id: user.id } };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error("🔥 SERVER ERROR:", err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;