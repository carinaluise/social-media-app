// routes/postRoutes.js
const express = require("express");
const { authenticate } = require("../middlewares/auth");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

// Ensure user is authenticated for post-related routes
router.use(authenticate);

// CRUD routes for posts
router.post("/", createPost);
router.get("/", getPosts);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

module.exports = router;
