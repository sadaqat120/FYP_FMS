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
      notes,
    } = req.body;

    if (
      !plotId ||
      !area ||
      !location ||
      !soilType ||
      !landType ||
      !cropFarmId
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
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
      notes,
    });

    await landRecord.save();
    res.status(201).json(landRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Land Record for specific cropFarmId (returns array for compatibility)
router.get("/:cropFarmId", authMiddleware, async (req, res) => {
  try {
    const record = await LandRecord.find({
      cropFarmId: req.params.cropFarmId,
      user: req.user.id,
    });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update existing Land Record
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedRecord = await LandRecord.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: "Land record not found." });
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
