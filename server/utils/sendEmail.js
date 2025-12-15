// utils/sendEmail.js
const nodemailer = require('nodemailer');

// 🔥 1. dotenv ෆයිල් එක අනිවාර්යයෙන්ම Load කරන්න ඕනේ මෙතනදි.
require('dotenv').config(); 

// 🔥 2. DEBUGGING SECTION (මේකෙන් බලමු පාස්වර්ඩ් එක හරියට එනවද කියලා)
console.log("\n--- 🔍 DEBUGGING SMTP CONFIG ---");
console.log("SMTP User:", process.env.SMTP_USER);

if (process.env.SMTP_PASS) {
    console.log("SMTP Pass Length:", process.env.SMTP_PASS.length);
    console.log("SMTP Pass Starts with:", process.env.SMTP_PASS.substring(0, 8) + "...");
    
    // Space Check
    if (process.env.SMTP_PASS.startsWith(" ") || process.env.SMTP_PASS.endsWith(" ")) {
        console.error("❌ ERROR: SMTP Key එකේ මුලට හෝ අගට අනවශ්‍ය SPACE එකක් ඇත!");
    } else {
        console.log("✅ No spaces detected in password.");
    }

    // Key Type Check
    if (process.env.SMTP_PASS.startsWith("xkeysib")) {
        console.error("❌ ERROR: ඔබ දමා ඇත්තේ API Key එකකි (xkeysib). Nodemailer සඳහා SMTP Key (xsmtpsib) අවශ්‍යයි!");
    } else if (process.env.SMTP_PASS.startsWith("xsmtpsib")) {
        console.log("✅ Key Type Correct (SMTP Key detected).");
    } else {
        console.warn("⚠️ WARNING: Key format එක අමුතුයි. හරිම SMTP Key එක ද කියලා බලන්න.");
    }

} else {
    console.error("❌ ERROR: SMTP_PASS සොයාගත නොහැක! .env ෆයිල් එක කියවන්නේ නැත.");
}
console.log("--------------------------------\n");


// 3. Create Transporter
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    logger: true,
    debug: true,
    tls: {
        rejectUnauthorized: false
    }
});


transporter.verify(function (error, success) {
    if (error) {
        console.error("❌ SMTP Verification Failed:", error.message);
    } else {
        console.log("✅ SMTP Server Connection Verified: Ready to send mail.");
    }
});

const sendEmail = async (mailOptions) => {
    try {
        // 🔥 මෙන්න මේ කොටස අලුතින් දාන්න
        const message = {
            from: "Sajith Tours <deneth676@gmail.com", // ⚠️ අනිවාර්යයෙන්ම ඔයාගේ Verify කරපු Email එක මෙතන තියෙන්න ඕනේ
            to: mailOptions.to,
            subject: mailOptions.subject,
            html: mailOptions.html,
        };

        const info = await transporter.sendMail(message);
        console.log('✅ Email sent successfully. ID: %s', info.messageId);
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw new Error('Email sending failed.');
    }
};

module.exports = sendEmail;