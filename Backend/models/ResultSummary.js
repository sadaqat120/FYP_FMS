// models/ResultSummary.js
const mongoose = require('mongoose');

const resultSummarySchema = new mongoose.Schema({
  totalYieldQuantity: {
    type: Number,
    required: true
  },
  yieldGrade: {
    type: String,
    required: true
  },
  expectedYield: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  rateSatisfaction: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  notes: {
    type: String
  },
  totalProductionCost: {
    type: Number,
    required: true
  },
  sellRevenue: {
    type: Number,
    required: true
  },
  finalNotes: {
    type: String
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmId: {  // Make sure this field name matches
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',  // Assuming you have a Farm model
    required: true
  },
   plotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record',
    required: true

    // Not required to maintain backward compatibility
  }
}, { timestamps: true });

module.exports = mongoose.model('ResultSummary', resultSummarySchema);