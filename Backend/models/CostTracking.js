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

module.exports = mongoose.model('CostTracking', costTrackingSchema);