// models/Record.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  plotName: String,
  area: String,
  location: String,
  soilType: String,
  landType: String,
  landSuitability: String,
  additionalNotes: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // farmFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmForm', required: true } // R
});

module.exports = mongoose.model('Record', recordSchema);