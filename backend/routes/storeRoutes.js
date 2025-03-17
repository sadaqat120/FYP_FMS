// routes/storeRoutes.js
const express = require("express");
const Store = require("../models/Store");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new store
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const newStore = new Store({ userId: req.user.id, name });
    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    res.status(500).json({ message: "Error creating store", error });
  }
});

// Get all stores for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const stores = await Store.find({ userId: req.user.id });
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stores", error });
  }
});

// Edit a store
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const updatedStore = await Store.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name },
      { new: true }
    );
    if (!updatedStore) return res.status(404).json({ message: "Store not found" });
    res.status(200).json(updatedStore);
  } catch (error) {
    res.status(500).json({ message: "Error updating store", error });
  }
});

// Delete a store
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Store.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting store", error });
  }
});

module.exports = router;
