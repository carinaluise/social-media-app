const express = require("express");
const { connectDB, closeDB } = require("./db");
const authRoutes = require("./api/v1/routes/authRoutes");
const userRoutes = require("./api/v1/routes/userRoutes");
const postRoutes = require("./api/v1/routes/postRoutes");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define authentication routes
app.use("/api/v1/auth", authRoutes);
// Define user routes
app.use("/api/v1/user", userRoutes);
// Define post routes
app.use("/api/v1/posts", postRoutes);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Graceful shutdown

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    closeDB().then(() => {
      console.log("MongoDB connection closed.");
      process.exit(0);
    });
  });
});
