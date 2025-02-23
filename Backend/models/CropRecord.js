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
//   farmFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmForm', required: true } // Refer
});

module.exports = mongoose.model('CropRecord', cropRecordSchema);