const express = require("express");
const Production = require("../models/Production");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new production record
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { farmId, productionType, soldAnimals, sellingRevenue, milkQuantity, milkRevenue, revenueType, revenueIncome, date, notes } = req.body;

    const newProduction = new Production({
      farmId,
      productionType,
      soldAnimals: productionType === "sellingAnimal" ? soldAnimals : null,
      sellingRevenue: productionType === "sellingAnimal" ? sellingRevenue : null,
      milkQuantity: (productionType === "milkSelling" || productionType === "milkProduction") ? milkQuantity : null,
      milkRevenue: productionType === "milkSelling" ? milkRevenue : null,
      revenueType: productionType === "otherRevenue" ? revenueType : null,
      revenueIncome: productionType === "otherRevenue" ? revenueIncome : null,
      date,
      notes: notes || null,
    });

    await newProduction.save();
    res.status(201).json(newProduction);
  } catch (error) {
    console.error("Error creating production record:", error);
    res.status(500).json({ message: "Error creating production record", error: error.message });
  }
});

// Get all production records for a specific farm
router.get("/farm/:farmId", authMiddleware, async (req, res) => {
  try {
    const productions = await Production.find({ farmId: req.params.farmId });
    res.status(200).json(productions);
  } catch (error) {
    console.error("Error fetching production records:", error);
    res.status(500).json({ message: "Error fetching production records", error: error.message });
  }
});

module.exports = router;