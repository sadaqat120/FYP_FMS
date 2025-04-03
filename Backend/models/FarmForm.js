// models/FarmForm.js
const mongoose = require('mongoose');

const farmFormSchema = new mongoose.Schema({
  farmName: {
    type: String,
    required: true,
    unique: true // Ensure each farm name is unique
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  landRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LandRecord' }],
  cropRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CropRecord' }],
  costTrackings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CostTracking' }],
  resultSummaries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ResultSummary' }]
});

module.exports = mongoose.model('FarmForm', farmFormSchema);