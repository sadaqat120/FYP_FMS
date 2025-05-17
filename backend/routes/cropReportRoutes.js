const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const CropFarm = require("../models/CropFarm");
const LandRecord = require("../models/LandRecord");
const CropRecord = require("../models/CropRecord");
const CostTracking = require("../models/CostTracking");
const ResultSummary = require("../models/ResultSummary");

router.get("/:cropFarmId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const cropFarmId = req.params.cropFarmId;

    const [farm, land, crop, costs, result] = await Promise.all([
      CropFarm.findOne({ _id: cropFarmId, userId }),
      LandRecord.findOne({ cropFarmId, user: userId }),
      CropRecord.findOne({ cropFarmId, user: userId }),
      CostTracking.find({ cropFarmId, user: userId }).sort({ date: 1 }),
      ResultSummary.findOne({ cropFarmId, user: userId }),
    ]);

    if (!crop) return res.status(404).json({ message: "Crop data not found" });

    // Calculate harvest progress
    let harvestStatus = "Not Harvested";
    const now = new Date();
    const start = new Date(crop.seedingDate);
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    const harvested = diff >= crop.duration;
    if (harvested) harvestStatus = "Harvested";

    res.status(200).json({
      farm,
      land,
      crop,
      costs,
      result,
      harvestStatus,
    });
  } catch (err) {
    console.error("Crop report fetch error:", err);
    res.status(500).json({ error: "Failed to load crop report." });
  }
});

module.exports = router;
