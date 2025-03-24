const express = require("express");
const router = express.Router();
const HumanResource = require("../models/HumanResource");
const UnitResource = require("../models/UnitResource");
const ItemResource = require("../models/ItemResource");
const Payment = require("../models/Payment");
const UsageTracking = require("../models/UsageTracking");
const RepairTracking = require("../models/RepairTracking");
const SaleTracking = require("../models/SaleTracking");

// Get all resources for a specific store
router.get("/:storeId", async (req, res) => {
  try {
    const storeId = req.params.storeId;

    const humanResources = await HumanResource.find({ storeId });
    const unitResources = await UnitResource.find({ storeId });
    const itemResources = await ItemResource.find({ storeId });

    const resourcesWithPayments = await Promise.all(humanResources.map(async (resource) => {
      const payments = await Payment.find({ workerId: resource.id, storeId });
      return { ...resource.toObject(), payments };
    }));

    const resourcesWithUsage = await Promise.all(unitResources.map(async (resource) => {
      const usage = await UsageTracking.find({ resourceId: resource.uniqueId, storeId });
      return { ...resource.toObject(), usage };
    }));

    const resourcesWithMaintenanceAndSales = await Promise.all(itemResources.map(async (resource) => {
      const maintenance = await RepairTracking.find({ resourceId: resource.uniqueId, storeId });
      const sales = await SaleTracking.find({ resourceId: resource.uniqueId, storeId });
      return { ...resource.toObject(), maintenance, sales };
    }));

    res.json({
      humanResources: resourcesWithPayments,
      unitResources: resourcesWithUsage,
      itemResources: resourcesWithMaintenanceAndSales,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
