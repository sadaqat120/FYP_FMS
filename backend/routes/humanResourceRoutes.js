// routes/humanResourceRoutes.js
const express = require("express");
const HumanResource = require("../models/HumanResource");
const Payment = require("../models/Payment");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new human resource
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { storeId, id, workerName, role, dateEnrolled, notes } = req.body;
    const userId = req.user.id;

    // Scoped uniqueness check: userId + storeId + id
    const existingResource = await HumanResource.findOne({ userId, storeId, id });
    if (existingResource) {
      return res.status(400).json({ message: "Worker ID already exists for this store and user." });
    }

    const newResource = new HumanResource({ userId, storeId, id, workerName, role, dateEnrolled, notes });
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: "Error creating human resource", error });
  }
});


// Get all human resources for a specific store
router.get("/:storeId", authMiddleware, async (req, res) => {
  try {
    const resources = await HumanResource.find({ storeId: req.params.storeId });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Error fetching human resources", error });
  }
});

// Add a payment record for a specific worker
router.post("/:storeId/:workerId/payments", authMiddleware, async (req, res) => {
  try {
    const { workerId } = req.params;
    const { paymentAmount, workStartDate, workEndDate, paymentDate, notes } = req.body;

    const resource = await HumanResource.findOne({ id: workerId, storeId: req.params.storeId });
    if (!resource) {
      return res.status(404).json({ message: "Worker not found." });
    }

    const newPayment = new Payment({ workerId, storeId: req.params.storeId, paymentAmount, workStartDate, workEndDate, paymentDate, notes });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: "Error recording payment", error });
  }
});

module.exports = router;
