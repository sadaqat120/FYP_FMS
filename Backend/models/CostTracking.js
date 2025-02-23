// models/CostTracking.js
const mongoose = require('mongoose');

const costTrackingSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true
  },
  equipmentCost: {
    type: Number,
    required: true
  },
  materialCost: {
    type: Number,
    required: true
  },
  laborCost: {
    type: Number,
    required: true
  },
  transportCost: {
    type: Number,
    required: true
  },
  miscellaneousCost: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  additionalNotes: {
    type: String
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// farmFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmForm', required: true } // Refer
});

module.exports = mongoose.model('CostTracking', costTrackingSchema);