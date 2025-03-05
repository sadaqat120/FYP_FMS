const express = require("express");
const Animal = require("../models/Animal");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new animal
router.post("/", authMiddleware, async (req, res) => {
  try {
    const animalData = req.body;

    // Log the incoming data for debugging
    console.log("Incoming animal data:", animalData);

    const newAnimal = new Animal(animalData);
    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    console.error("Error creating animal:", error); // Log the error
    res.status(500).json({ message: "Error creating animal", error: error.message });
  }
});

// Get all animals for a specific farm
router.get("/farm/:farmId", authMiddleware, async (req, res) => {
  try {
    const animals = await Animal.find({ farmId: req.params.farmId });
    res.status(200).json(animals);
  } catch (error) {
    console.error("Error fetching animals:", error); // Log the error
    res.status(500).json({ message: "Error fetching animals", error: error.message });
  }
});

// Other routes (update, delete, etc.) can be added here

module.exports = router;
