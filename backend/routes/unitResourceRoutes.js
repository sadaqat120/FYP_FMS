const express = require("express");
const UnitResource = require("../models/UnitResource");
const UsageTracking = require("../models/UsageTracking");
const Store = require("../models/Store");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new unit-based resource
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      storeId,
      resourceType,
      resourceName,
      uniqueId,
      quantity,
      unit,
      costPerUnit,
      totalCost,
      dateAdded,
      notes,
    } = req.body;
    const userId = req.user.id;

    // Scoped uniqueness check: userId + storeId + uniqueId
    const existingResource = await UnitResource.findOne({
      userId,
      storeId,
      uniqueId,
    });
    if (existingResource) {
      return res
        .status(400)
        .json({ message: "Unit ID already exists for this store and user." });
    }

    const newResource = new UnitResource({
      userId,
      storeId,
      resourceType,
      resourceName,
      uniqueId,
      quantity,
      unit,
      costPerUnit,
      totalCost,
      dateAdded,
      notes,
    });
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating unit-based resource", error });
  }
});

// Track resource usage
router.post("/usage", authMiddleware, async (req, res) => {
  try {
    const {
      storeId,
      resourceId,
      quantityUsed,
      usagePurpose,
      dateOfUsage,
      notes,
    } = req.body;

    const newUsage = new UsageTracking({
      storeId,
      resourceId,
      quantityUsed,
      usagePurpose,
      dateOfUsage,
      notes,
    });
    await newUsage.save();
    res.status(201).json(newUsage);
  } catch (error) {
    res.status(500).json({ message: "Error tracking resource usage", error });
  }
});

// Get all unit-based resources for a specific store
router.get("/:storeId", authMiddleware, async (req, res) => {
  try {
    const resources = await UnitResource.find({ storeId: req.params.storeId });
    res.status(200).json(resources);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching unit-based resources", error });
  }
});

// Generate unique ID for unit resources
router.get("/generate-id/:storeId", authMiddleware, async (req, res) => {
  try {
    const { storeId } = req.params;
    const userId = req.user.id;

    const store = await Store.findOne({ _id: storeId, userId });
    if (!store) return res.status(404).json({ message: "Store not found" });

    const prefix = `FMS-${store.name}-Unit-`;

    const existing = await UnitResource.find({ storeId, userId });
    const usedNumbers = new Set();

    existing.forEach((resource) => {
      if (resource.uniqueId.startsWith(prefix)) {
        const numStr = resource.uniqueId.replace(prefix, "");
        const num = parseInt(numStr);
        if (!isNaN(num)) usedNumbers.add(num);
      }
    });

    let nextNumber = 1;
    while (usedNumbers.has(nextNumber)) nextNumber++;

    const newId = `${prefix}${nextNumber}`;
    res.status(200).json({ id: newId });
  } catch (error) {
    res.status(500).json({ message: "Error generating ID", error });
  }
});

module.exports = router;
