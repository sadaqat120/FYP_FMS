const express = require("express");
const Reminder = require("../models/Reminder");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new reminder
router.post("/", authMiddleware, async (req, res) => {
  try {
    const reminder = new Reminder({
      ...req.body,
      user: req.user.id, // assign user from token
    });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reminders for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a reminder only if it belongs to user
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });
    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a reminder only if it belongs to user
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
