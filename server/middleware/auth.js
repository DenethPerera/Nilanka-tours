// middleware/auth.js

const jwt = require('jsonwebtoken');
// Ensure dotenv is loaded so process.env.JWT_SECRET is accessible
require('dotenv').config(); 

module.exports = function(req, res, next) {
    
    // 1. Get token from header
    // The client sends the token in the 'x-auth-token' header
    const token = req.header('x-auth-token');

    // 2. Check if no token is present
    if (!token) {
        // Must return here to prevent hanging
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. Verify token
    try {
        // jwt.verify throws an error if the token is invalid or expired
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // If valid, attach the decoded user payload to the request object
        req.user = decoded.user;
        
        // 4. Proceed to the next handler (the actual route function)
        next(); 
    } catch (err) {
        // This catches errors from jwt.verify (Expired, Invalid signature, etc.)
        console.error("Token verification failed:", err.message);
        
        // Must return here to stop execution immediately after sending the error
        return res.status(401).json({ msg: 'Token is not valid or has expired' });
    }
};