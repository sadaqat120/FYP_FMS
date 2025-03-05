const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { farmId, expenseType, amount, notes, date } = req.body;

    const newExpense = new Expense({
      farmId,
      expenseType,
      amount,
      notes: notes || null,
      date,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: "Error creating expense", error: error.message });
  }
});

// Get all expenses for a specific farm
router.get("/farm/:farmId", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ farmId: req.params.farmId });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Error fetching expenses", error: error.message });
  }
});

module.exports = router;
