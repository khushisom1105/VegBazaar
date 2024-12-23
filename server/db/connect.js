const mongoose = require("mongoose");

const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            connectTimeoutMS: 9000,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
};

module.exports = connectDB;
