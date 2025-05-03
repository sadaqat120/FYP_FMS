const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const LandRecord = require("../models/LandRecord");
const CropRecord = require("../models/CropRecord");
const CostTracking = require("../models/CostTracking");
const ResultSummary = require("../models/ResultSummary");

router.get("/:cropFarmId", authMiddleware, async (req, res) => {
  try {
    const { cropFarmId } = req.params;
    const userId = req.user.id;

    const [landRecords, cropRecords, costEntries, resultSummaries] =
      await Promise.all([
        LandRecord.find({ cropFarmId, user: userId }),
        CropRecord.find({ cropFarmId, user: userId }),
        CostTracking.find({ cropFarmId, user: userId }).sort({ date: 1 }),
        ResultSummary.find({ cropFarmId, user: userId }),
      ]);

    const land = landRecords[0] || null;
    const crop = cropRecords[0] || null;
    const costs = costEntries;
    const summary = resultSummaries[0] || null;

    res.status(200).json({ land, crop, costs, summary });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching dashboard data." });
  }
});

module.exports = router;
