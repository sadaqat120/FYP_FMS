const express = require("express");
const router = express.Router();
const LandRecord = require("../models/LandRecord");
const authMiddleware = require("../middlewares/authMiddleware");

// Create Land Record
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      cropFarmId,
      plotId,
      area,
      location,
      soilType,
      landType,
      landSuitability,
      notes
    } = req.body;

    // Basic validation
    if (!plotId || !area || !location || !soilType || !landType || !cropFarmId) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const landRecord = new LandRecord({
      user: req.user.id,
      cropFarmId,
      plotId,
      area,
      location,
      soilType,
      landType,
      landSuitability,
      notes
    });

    await landRecord.save();
    res.status(201).json(landRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Land Records for a specific crop farm
router.get("/:cropFarmId", authMiddleware, async (req, res) => {
  try {
    const records = await LandRecord.find({
      cropFarmId: req.params.cropFarmId,
      user: req.user.id
    });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
