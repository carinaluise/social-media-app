const User = require("../models/User");
const Post = require("../models/Post");
const multer = require("multer");

// Configure multer storage for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle file uploads
const handleFileUpload = upload.single("image");

// Get posts
const getPosts = async (req, res, next) => {
  try {
    // Find posts, sort by createdAt in descending order, limit to 10
    const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
    res.json(posts); // Send posts as JSON response
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// Create a new post
const createPost = async (req, res, next) => {
  try {
    // Handle file upload
    handleFileUpload(req, res, async function (err) {
      if (err) {
        return next(err); // Pass error to the error handling middleware
      }

      const { description } = req.body; // Extract description from request body
      const user = await User.findById(req.user._id); // Find user by ID

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create a new post instance
      const newPost = new Post({
        userId: req.user._id,
        description: description,
        image: req.file ? req.file.buffer : undefined, // Store image as buffer
      });

      // Save the new post to the database
      await newPost.save();
      res.json({ message: "Post created successfully" }); // Send success response
    });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// Update an existing post
const updatePost = async (req, res, next) => {
  const postId = req.params.postId; // Extract post ID from request parameters
  const { description, image } = req.body; // Extract description and image from request body

  try {
    // Find and update post by ID
    const post = await Post.findByIdAndUpdate(
      postId,
      { description, image },
      { new: true } // Return updated post
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post updated successfully", post }); // Send success response
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// Delete an existing post
const deletePost = async (req, res, next) => {
  const postId = req.params.postId; // Extract post ID from request parameters

  try {
    // Find and delete post by ID
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully", post }); // Send success response
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
