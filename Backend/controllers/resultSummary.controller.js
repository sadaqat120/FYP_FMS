// controllers/resultSummary.controller.js
const ResultSummary = require('../models/ResultSummary');

exports.createResultSummary = async (req, res) => {
  try {
    const {
      totalYield,
      yieldGrade,
      expectedYield,
      unit,
      satisfaction,
      notes,
      totalCost,
      sellRevenue,
      netProfit,
      finalNotes,
      farmId,
      plotId

    } = req.body;

    const resultSummary = new ResultSummary({
      totalYieldQuantity: totalYield,
      yieldGrade,
      expectedYield,
      unit,
      rateSatisfaction: satisfaction,
      notes,
      totalProductionCost: totalCost,
      sellRevenue,
      finalNotes,
      userId: req.user._id, // From auth middleware
      farmId,
      plotId

    });

    await resultSummary.save();

    res.status(201).json({
      success: true,
      message: 'Result summary created successfully',
      data: resultSummary
    });
  } catch (error) {
    console.error('Create result summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating result summary',
      error: error.message
    });
  }
};