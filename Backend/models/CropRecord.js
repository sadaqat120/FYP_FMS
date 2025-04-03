// models/CropRecord.js
const mongoose = require('mongoose');

const cropRecordSchema = new mongoose.Schema({
  season: {
    type: String,
    required: true
  },
  cropType: {
    type: String,
    required: true
  },
  cropName: {
    type: String,
    required: true
  },
  expectedDuration: {
    type: Number,
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

module.exports = mongoose.model('CropRecord', cropRecordSchema);