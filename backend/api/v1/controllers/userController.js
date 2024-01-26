const User = require("../models/User");

// Middleware to get user profile
const getUserProfile = async (req, res, next) => {
  const { _id } = req.user; // Extract user ID from request user object
  try {
    // Find user by ID in the database
    const user = await User.findById(_id);

    // If user is not found, return 404 status with error message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user profile data as JSON response
    res.json({ user });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

module.exports = { getUserProfile };
