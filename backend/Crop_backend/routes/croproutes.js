const express = require("express");
const router = express.Router();
const Crop = require("../src/components/Crop_backend/models/crop"); // Fixed path issue

// ✅ Add a new crop
router.post("/", async (req, res) => {
    try {
        const newCrop = new Crop(req.body);
        const savedCrop = await newCrop.save();
        res.status(201).json({ message: "Crop added successfully", crop: savedCrop });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// ✅ Get all crops
router.get("/", async (req, res) => {
    try {
        const crops = await Crop.find().sort({ createdAt: -1 }); // Sort by latest first
        res.json({ success: true, crops });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Get a single crop by ID
router.get("/:id", async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop) return res.status(404).json({ success: false, message: "Crop not found" });
        res.json({ success: true, crop });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Update a crop
router.put("/:id", async (req, res) => {
    try {
        const updatedCrop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCrop) return res.status(404).json({ success: false, message: "Crop not found" });
        res.json({ success: true, message: "Crop updated successfully", crop: updatedCrop });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Delete a crop
router.delete("/:id", async (req, res) => {
    try {
        const deletedCrop = await Crop.findByIdAndDelete(req.params.id);
        if (!deletedCrop) return res.status(404).json({ success: false, message: "Crop not found" });
        res.json({ success: true, message: "Crop deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
