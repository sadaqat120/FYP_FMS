const express = require("express");
const router = express.Router();
const ResultSummary = require("../models/ResultSummary");
const authMiddleware = require("../middlewares/authMiddleware");

// POST: Save result summary
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
      totalCost,
      sellRevenue,
      revenueNotes
    } = req.body;

    if (
      !cropFarmId || !totalYield || !yieldGrade || !expectedYield || !unit ||
      !satisfaction || !totalCost || !sellRevenue
    ) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const netProfit = parseFloat(sellRevenue) - parseFloat(totalCost);

    const resultSummary = new ResultSummary({
      user: req.user.id,
      cropFarmId,
      totalYield,
      yieldGrade,
      expectedYield,
      unit,
      satisfaction,
      yieldNotes,
      totalCost,
      sellRevenue,
      netProfit,
      revenueNotes
    });

    await resultSummary.save();
    res.status(201).json(resultSummary);
  } catch (error) {
    console.error("Error saving result summary:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Fetch summaries for crop farm
router.get("/:cropFarmId", authMiddleware, async (req, res) => {
  try {
    const summaries = await ResultSummary.find({
      user: req.user.id,
      cropFarmId: req.params.cropFarmId
    });
    res.status(200).json(summaries);
  } catch (error) {
    console.error("Error fetching result summaries:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
