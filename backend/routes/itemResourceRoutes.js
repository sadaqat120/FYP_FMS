const express = require("express");
const ItemResource = require("../models/ItemResource");
const RepairTracking = require("../models/RepairTracking");
const SaleTracking = require("../models/SaleTracking");
const Store = require("../models/Store");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new item-based resource
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      storeId, resourceType, resourceName, uniqueId,
      quantity, costPerItem, totalCost, condition, dateAdded, notes
    } = req.body;
    const userId = req.user.id;

    // Scoped uniqueness check: userId + storeId + uniqueId
    const existingResource = await ItemResource.findOne({ userId, storeId, uniqueId });
    if (existingResource) {
      return res.status(400).json({ message: "Item ID already exists for this store and user." });
    }

    const newResource = new ItemResource({
      userId, storeId, resourceType, resourceName, uniqueId,
      quantity, costPerItem, totalCost, condition, dateAdded, notes
    });
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: "Error creating item-based resource", error });
  }
});


// Track repair/maintenance
router.post("/repair", authMiddleware, async (req, res) => {
  try {
    const { storeId, resourceId, maintenanceType, maintenanceCost, dateOfMaintenance, notes } = req.body;

    const newRepair = new RepairTracking({ storeId, resourceId, maintenanceType, maintenanceCost, dateOfMaintenance, notes });
    await newRepair.save();
    res.status(201).json(newRepair);
  } catch (error) {
    res.status(500).json({ message: "Error tracking repair/maintenance", error });
  }
});

// Record sale
router.post("/sale", authMiddleware, async (req, res) => {
  try {
    const { storeId, resourceId, itemsSold, salePricePerUnit, dateOfSale, notes } = req.body;

    const totalSalePrice = itemsSold * salePricePerUnit; // Calculate total sale price

    const newSale = new SaleTracking({ storeId, resourceId, itemsSold, salePricePerUnit, totalSalePrice, dateOfSale, notes });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ message: "Error recording sale", error });
  }
});

// Get all item-based resources for a specific store
router.get("/:storeId", authMiddleware, async (req, res) => {
  try {
    const resources = await ItemResource.find({ storeId: req.params.storeId });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item-based resources", error });
  }
});

// Generate unique ID for item resources
router.get("/generate-id/:storeId", authMiddleware, async (req, res) => {
  try {
    const { storeId } = req.params;
    const userId = req.user.id;

    // Get store details
    const store = await Store.findOne({ _id: storeId, userId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Create prefix based on store name
    const prefix = `FMS-${store.name}-Item-`;

    // Find all existing item resources for this store
    const existingResources = await ItemResource.find({ storeId, userId });
    
    // Track used numbers
    const usedNumbers = new Set();
    
    existingResources.forEach(resource => {
      if (resource.uniqueId.startsWith(prefix)) {
        const numStr = resource.uniqueId.replace(prefix, '');
        const num = parseInt(numStr);
        if (!isNaN(num)) {
          usedNumbers.add(num);
        }
      }
    });

    // Find the first available number starting from 1
    let nextNumber = 1;
    while (usedNumbers.has(nextNumber)) {
      nextNumber++;
    }

    // Generate the new ID
    const newId = `${prefix}${nextNumber}`;

    res.status(200).json({ id: newId });
  } catch (error) {
    console.error("Error generating ID:", error);
    res.status(500).json({ 
      message: "Error generating ID", 
      error: error.message 
    });
  }
});

module.exports = router;
