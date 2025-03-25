// controllers/record.controller.js
const Record = require('../models/landRecord');

exports.createRecord = async (req, res) => {
  try {
    const {
      plotName,
      area,
      location,
      soilType,
      landType,
      areaUnit,
      landSuitability,
      additionalNotes,
      farmId,
      plotId
    } = req.body;

    // Validate required fields
    if (!plotName || !area || !location || !soilType || !landType || !farmId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields including farmId'
      });
    }

    const newRecord = new Record({
      plotName,
      area,
      location,
      soilType,
      landType,
      areaUnit,
      landSuitability,
      additionalNotes,
      userId: req.user._id, // From auth middleware
      farmId,
      plotId
    });

    const savedRecord = await newRecord.save();

    res.status(201).json({
      success: true,
      message: 'Land record created successfully',
      record: savedRecord
    });
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating land record',
      error: error.message
    });
  }
};