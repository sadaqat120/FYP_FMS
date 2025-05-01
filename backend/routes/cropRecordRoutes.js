const express = require("express");
const router = express.Router();
const CropRecord = require("../models/CropRecord");
const authMiddleware = require("../middlewares/authMiddleware");

// Create Crop Record
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { cropFarmId, season, cropType, cropName, duration, seedingDate, notes } = req.body;

    // Basic validation
    if (!cropFarmId || !season || !cropType || !cropName || !duration || !seedingDate) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const cropRecord = new CropRecord({
      user: req.user.id,
      cropFarmId,
      season,
      cropType,
      cropName,
      duration,
      seedingDate,
      notes
    });

    await cropRecord.save();
    res.status(201).json(cropRecord);
  } catch (error) {
    console.error("Crop Record Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all crop records for a specific CropFarm
router.get("/:cropFarmId", authMiddleware, async (req, res) => {
  try {
    const cropRecords = await CropRecord.find({
      user: req.user.id,
      cropFarmId: req.params.cropFarmId
    });
    res.status(200).json(cropRecords);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
