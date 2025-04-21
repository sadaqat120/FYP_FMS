// routes/cropFarmRoutes.js
const express = require("express");
const CropFarm = require("../models/CropFarm");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new CropFarm
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const newCropFarm = new CropFarm({ userId: req.user.id, name });
    await newCropFarm.save();
    res.status(201).json(newCropFarm);
  } catch (error) {
    res.status(500).json({ message: "Error creating CropFarm", error });
  }
});

// Get all CropFarm for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cropFarms = await CropFarm.find({ userId: req.user.id });
    res.status(200).json(cropFarms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cropFarms", error });
  }
});

// Edit a CropFarm
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCropFarm = await CropFarm.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name },
      { new: true }
    );
    if (!updatedCropFarm) return res.status(404).json({ message: "CropFarm not found" });
    res.status(200).json(updatedCropFarm);
  } catch (error) {
    res.status(500).json({ message: "Error updating CropFarm", error });
  }
});

// Delete a CropFarm
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await CropFarm.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.status(200).json({ message: "CropFarm deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting CropFarm", error });
  }
});

module.exports = router;
