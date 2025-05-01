const express = require("express");
const router = express.Router();
const CostTracking = require("../models/CostTracking");
const authMiddleware = require("../middlewares/authMiddleware");

// POST: Create cost entry (NO plotId)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      cropFarmId,
      activity,
      equipmentCost,
      materialCost,
      laborCost,
      transportCost,
      miscCost,
      date,
      notes
    } = req.body;

    if (
      !cropFarmId || !activity || !date ||
      typeof equipmentCost !== 'number' ||
      typeof materialCost !== 'number' ||
      typeof laborCost !== 'number' ||
      typeof transportCost !== 'number' ||
      typeof miscCost !== 'number'
    ) {
      return res.status(400).json({ message: "All fields except notes are required and must be numbers." });
    }

    const costEntry = new CostTracking({
      user: req.user.id,
      cropFarmId,
      activity,
      equipmentCost,
      materialCost,
      laborCost,
      transportCost,
      miscCost,
      date,
      notes
    });

    await costEntry.save();
    res.status(201).json(costEntry);
  } catch (error) {
    console.error("Error saving cost tracking:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all cost entries by CropFarm
router.get("/:cropFarmId", authMiddleware, async (req, res) => {
  try {
    const records = await CostTracking.find({
      user: req.user.id,
      cropFarmId: req.params.cropFarmId
    });
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching cost tracking records:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
