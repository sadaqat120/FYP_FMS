const express = require("express");
const multer = require("multer");
const path = require("path");

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
router.post("/", profilePictureUpload.single("profilePicture"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File upload failed" });
  }

  const imagePath = req.file.filename;
  console.log(imagePath)
  res.json({ imagePath });
});

module.exports = router;
