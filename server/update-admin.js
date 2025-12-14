const mongoose = require('mongoose');
const User = require('./models/User'); // Ensure this path is correct
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔌 Connected to DB...");

        const USERNAME = "Sajith Nilanka2005"; 
        const PASSWORD = "Sajith200553"; 

        // 1. Delete existing user to start fresh
        await User.deleteOne({ username: USERNAME });

        // 2. Create the User with the PLAIN PASSWORD
        // Your User.js file will automatically hash this when .save() is called
        const newUser = new User({
            username: USERNAME,
            password: PASSWORD 
        });

        await newUser.save();

        console.log("========================================");
        console.log("✅ SUCCESS! Admin Created.");
        console.log(`👤 Username: ${USERNAME}`);
        console.log(`🔑 Password: ${PASSWORD}`);
        console.log("ℹ️  (Password was automatically hashed by your Model)");
        console.log("========================================");
        
        mongoose.connection.close();

    } catch (err) {
        console.error("❌ Error:", err.message);
        mongoose.connection.close();
    }
};

createAdmin();