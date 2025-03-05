const express = require("express");
const Animal = require("../models/Animal");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new animal
router.post("/", authMiddleware, async (req, res) => {
  try {
    const animalData = req.body;
    const newAnimal = new Animal(animalData);
    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({ message: "This animal ID is already in use. Animal ID must be unique." });
    }
    res.status(500).json({ message: "Error creating animal", error: error.message });
  }
});

// Get all animals for a specific farm
router.get("/farm/:farmId", authMiddleware, async (req, res) => {
  try {
    const animals = await Animal.find({ farmId: req.params.farmId });
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching animals", error: error.message });
  }
});

// Other routes (update, delete, etc.) can be added here

module.exports = router;
