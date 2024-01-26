const mongoose = require("mongoose");
require("dotenv").config();

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Connect to MongoDB using the provided URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Function to close the MongoDB connection
const closeDB = async () => {
  try {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
};

module.exports = { connectDB, closeDB };
