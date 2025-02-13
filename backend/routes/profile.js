const express = require("express");
const multer = require("multer");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/profilePictures"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Fetch Profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error.");
  }
});

// Update Profile Picture
router.post("/picture", authMiddleware, upload.single("profilePicture"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.profilePicture = `/uploads/profilePictures/${req.file.filename}`;
    await user.save();

    res.json({ message: "Profile picture updated.", profilePicture: user.profilePicture });
  } catch (err) {
    res.status(500).send("Server error.");
  }
});

module.exports = router;
