// controllers/dashboard.controller.js
const FarmForm = require('../models/FarmForm');
const Record = require('../models/landRecord');
const CropRecord = require('../models/CropRecord');
const CostTracking = require('../models/CostTracking');
const ResultSummary = require('../models/ResultSummary');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const { farmId } = req.query; // Get farmId from query params
    
    if (!farmId) {
      return res.status(400).json({
        success: false,
        message: 'Farm ID is required'
      });
    }
    
    // First, fetch the farm document to verify it exists and belongs to the user
    const farm = await FarmForm.findOne({ _id: farmId, userId });
   
    if (!farm) {
      return res.status(404).json({
        success: false,
        message: 'Farm not found or access denied'
      });
    }
   
    // Fetch all records (plots) for this farm
    const records = await Record.find({ farmId }).sort({ createdAt: -1 });
    
    // For each record/plot, fetch the associated data
    const plotDataPromises = records.map(async (record) => {
      const plotId = record._id;
      
      // Fetch the latest crop record for this plot
      const cropRecords = await CropRecord.find({ plotId })
        .sort({ createdAt: -1 });
      
      // Fetch cost trackings for this plot
      const costTrackings = await CostTracking.find({ plotId })
        .sort({ date: -1 })
        .limit(5);
      
      // Fetch result summary for this plot
      const resultSummary = await ResultSummary.findOne({ plotId })
        .sort({ createdAt: -1 });
      
      return {
        plotInfo: record,
        crops: cropRecords,
        costs: costTrackings,
        results: resultSummary
      };
    });
    
    const plotsData = await Promise.all(plotDataPromises);
    
    // Also get the aggregated data for the farm as before
    const cropRecords = await CropRecord.find({ farmId })
      .sort({ createdAt: -1 });
    
    const costTrackings = await CostTracking.find({ farmId })
      .sort({ date: -1 })
      .limit(5);
    
    const resultSummaries = await ResultSummary.find({ farmId })
      .sort({ createdAt: -1 })
      .limit(1);
    
    res.status(200).json({
      success: true,
      data: {
        farm,
        records,
        cropRecords,
        costTrackings,
        resultSummary: resultSummaries[0] || null,
        plotsData // Add the organized plot data
      }
    });
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
};