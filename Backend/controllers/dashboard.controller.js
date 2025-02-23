// controllers/dashboard.controller.js
const FarmForm = require('../models/FarmForm');
const Record = require('../models/landRecord');
const CropRecord = require('../models/CropRecord');
const CostTracking = require('../models/CostTracking');
const ResultSummary = require('../models/ResultSummary');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all required data
    const records = await Record.find({ userId });
    console.log('records:', records);
    const cropRecords = await CropRecord.find({ userId });
    console.log('cropRecords:', cropRecords);
    const costTrackings = await CostTracking.find({ userId })
      .sort({ date: -1 })
      .limit(5); // Get latest 5 cost records
    console.log('costTrackings:', costTrackings);
    const resultSummaries = await ResultSummary.find({ userId })
      .sort({ _id: -1 })
      .limit(1); // Get latest result summary
    console.log('resultSummaries:', resultSummaries);
    res.status(200).json({
      success: true,
      data: {
        records,
        cropRecords,
        costTrackings,
        resultSummary: resultSummaries[0] || null
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