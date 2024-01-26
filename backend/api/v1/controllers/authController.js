const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Register a new user
const register = async (req, res, next) => {
  // Extract username, email, and password from request body
  const { username, email, password } = req.body;

  try {
    // Create a new user instance with provided data
    const user = new User({ username, email, password });

    // Save the user to the database
    await user.save();

    // Send success response
    res.json({ message: "Registration successful" });
  } catch (error) {
    // Pass error to the error handling middleware
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  try {
    // Find user by username in the database
    const user = await User.findOne({ username });

    // If user not found, send error response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, send error response
    if (passwordMatch === false) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token with user ID and expiration time
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24 hours", // Token expiration time
    });

    // Send token in response
    res.json({ token });
  } catch (error) {
    // Pass error to the error handling middleware
    next(error);
  }
};

module.exports = { register, login };
