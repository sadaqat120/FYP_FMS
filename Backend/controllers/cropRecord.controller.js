// controllers/cropRecord.controller.js
const CropRecord = require('../models/CropRecord');

exports.createCropRecord = async (req, res) => {
  try {
    const {
      season,
      cropType,
      cropName,
      duration,
      notes,
      farmId,
      plotId

    } = req.body;

    // Convert duration string to number (remove "days" and parse)
    const expectedDuration = parseInt(duration.replace(/\D/g, ''));

    const newCropRecord = new CropRecord({
      season,
      cropType,
      cropName,
      expectedDuration,
      additionalNotes: notes,
      userId: req.user._id, // From auth middleware
      farmId,
      plotId
    });

    const savedRecord = await newCropRecord.save();

    res.status(201).json({
      success: true,
      message: 'Crop record created successfully',
      record: savedRecord
    });
  } catch (error) {
    console.error('Error creating crop record:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating crop record',
      error: error.message
    });
  }
};

// Get all crop records for a user
exports.getCropRecords = async (req, res) => {
  try {
    const cropRecords = await CropRecord.find({ userId: req.user._id });
    res.status(200).json({
      success: true,
      records: cropRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching crop records',
      error: error.message
    });
  }
};