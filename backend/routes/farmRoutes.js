// routes/farmRoutes.js
const express = require("express");
const Farm = require("../models/Farm");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new farm
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const newFarm = new Farm({ userId: req.user.id, name });
    await newFarm.save();
    res.status(201).json(newFarm);
  } catch (error) {
    res.status(500).json({ message: "Error creating farm", error });
  }
});

// Get all farms for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.user.id });
    res.status(200).json(farms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching farms", error });
  }
});

// Edit a farm
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const updatedFarm = await Farm.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name },
      { new: true }
    );
    if (!updatedFarm) return res.status(404).json({ message: "Farm not found" });
    res.status(200).json(updatedFarm);
  } catch (error) {
    res.status(500).json({ message: "Error updating farm", error });
  }
});

// Delete a farm
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Farm.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.status(200).json({ message: "Farm deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting farm", error });
  }
});

module.exports = router;