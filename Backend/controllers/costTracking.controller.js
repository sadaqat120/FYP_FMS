// controllers/costTracking.controller.js
const CostTracking = require('../models/CostTracking');

exports.createCostTracking = async (req, res) => {
  try {
    const {
      activity,
      equipmentCost,
      materialCost,
      laborCost,
      transportCost,
      miscCost,
      date,
      notes,
      farmId,
      plotId

    } = req.body;

    const newCostTracking = new CostTracking({
      activity,
      equipmentCost: Number(equipmentCost),
      materialCost: Number(materialCost),
      laborCost: Number(laborCost),
      transportCost: Number(transportCost),
      miscellaneousCost: Number(miscCost),
      date: new Date(date),
      additionalNotes: notes,
      userId: req.user._id,
      farmId,
      plotId


    });

    const savedRecord = await newCostTracking.save();

    res.status(201).json({
      success: true,
      message: 'Cost tracking record created successfully',
      record: savedRecord
    });
  } catch (error) {
    console.error('Error creating cost tracking record:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating cost tracking record',
      error: error.message
    });
  }
};

// Get cost tracking records for a user
exports.getCostTrackingRecords = async (req, res) => {
  try {
    const records = await CostTracking.find({ userId: req.user._id });
    res.status(200).json({
      success: true,
      records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cost tracking records',
      error: error.message
    });
  }
};
