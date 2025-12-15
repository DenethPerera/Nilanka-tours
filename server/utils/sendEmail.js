// utils/sendEmail.js

const nodemailer = require('nodemailer');

// 1. Create a transporter object using the SMTP settings from .env
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },

    family: 4, 
    
    
    connectionTimeout: 10000, 
    greetingTimeout: 5000,   
    socketTimeout: 10000,
    
   
    tls: {
        rejectUnauthorized: false
    }
});

// CRITICAL: Add the connection verification step (keep this for debugging)
transporter.verify(function (error, success) {
    if (error) {
        console.error("❌ SMTP Verification Failed:", error.message);
    } else {
        console.log("✅ SMTP Server Connection Verified: Ready to send mail.");
    }
});


/**
 * Sends an email using the configured transporter.
 * @param {object} mailOptions - Recipient, subject, and content details.
 */
const sendEmail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully. Message ID: %s', info.messageId);
    } catch (error) {
        console.error('❌ Error sending email during runtime:', error);
        throw new Error('Email sending failed.');
    }
};

module.exports = sendEmail;