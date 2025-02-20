// profilePictureUpload.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware"); // Import your existing auth middleware

const router = express.Router();

// Ensure uploads folder exists
const uploadFolder = path.join(__dirname, "../uploads/profilePictures");
const fs = require("fs");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: uploadFolder,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const profilePictureUpload = multer({ storage });

// Upload image route
router.post("/", authMiddleware, profilePictureUpload.single("profilePicture"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File upload failed" });
  }

  const imagePath = req.file.filename;

  // Update user's profile picture in the database
  try {
    const userId = req.user.id; // Now this should work
    await User.findByIdAndUpdate(userId, { profilePicture: imagePath });
    res.json({ imagePath });
  } catch (error) {
    console.error("Database update failed:", error); // Log the error for debugging
    res.status(500).json({ error: "Database update failed" });
  }
});

module.exports = router;