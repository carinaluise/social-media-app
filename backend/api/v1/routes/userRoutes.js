const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { getUserProfile } = require("../controllers/userController");

const router = express.Router();

router.use(authenticate);

router.get("/:userId", getUserProfile);

module.exports = router;
