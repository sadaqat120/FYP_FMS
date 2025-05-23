const express = require("express");
const router = express.Router();
const ResultSummary = require("../models/ResultSummary");
const authMiddleware = require("../middlewares/authMiddleware");
const CropRecord = require("../models/CropRecord");

// POST: Create new result summary
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      cropFarmId,
      totalYield,
      yieldGrade,
      expectedYield,
      unit,
      satisfaction,
      yieldNotes,
      sellRevenue,
      revenueNotes,
    } = req.body;

    if (
      !cropFarmId ||
      totalYield === undefined ||
      !yieldGrade ||
      expectedYield === undefined ||
      !unit ||
      !satisfaction ||
      sellRevenue === undefined
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    const resultSummary = new ResultSummary({
      user: req.user.id,
      cropFarmId,
      totalYield,
      yieldGrade,
      expectedYield,
      unit,
      satisfaction,
      yieldNotes,
      sellRevenue,
      revenueNotes,
    });

    await resultSummary.save();
    res.status(201).json(resultSummary);
  } catch (error) {
    console.error("Error saving result summary:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT: Update existing summary
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const {
      totalYield,
      yieldGrade,
      expectedYield,
      unit,
      satisfaction,
      yieldNotes,
      sellRevenue,
      revenueNotes,
    } = req.body;

    if (
      totalYield === undefined ||
      !yieldGrade ||
      expectedYield === undefined ||
      !unit ||
      !satisfaction ||
      totalCost === undefined ||
      sellRevenue === undefined
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    const updated = await ResultSummary.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        totalYield,
        yieldGrade,
        expectedYield,
        unit,
        satisfaction,
        yieldNotes,
        totalCost,
        sellRevenue,
        revenueNotes,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Summary not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating result summary:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Fetch summaries by cropFarmId
router.get("/:cropFarmId", authMiddleware, async (req, res) => {
  try {
    const summaries = await ResultSummary.find({
      user: req.user.id,
      cropFarmId: req.params.cropFarmId,
    });
    res.status(200).json(summaries);
  } catch (error) {
    console.error("Error fetching result summaries:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Check if crop is harvested
router.get("/check-harvest/:cropFarmId", authMiddleware, async (req, res) => {
  try {
    const crop = await CropRecord.findOne({
      cropFarmId: req.params.cropFarmId,
      user: req.user.id,
    });

    if (!crop) return res.status(404).json({ isHarvested: false, message: "Crop record not found" });

    const now = new Date();
    const seedingDate = new Date(crop.seedingDate);
    const duration = Number(crop.duration);
    const daysPassed = Math.floor((now - seedingDate) / (1000 * 60 * 60 * 24));

    const isHarvested = daysPassed >= duration;
    res.status(200).json({ isHarvested });
  } catch (err) {
    console.error("Harvest check error:", err);
    res.status(500).json({ error: "Server error during harvest check." });
  }
});

module.exports = router;
