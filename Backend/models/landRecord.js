// models/Record.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  plotName: String,
  area: String,
  location: String,
  soilType: String,
  landType: String,
  areaUnit:String,
  landSuitability: String,
  additionalNotes: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmId: {  // Make sure this field name matches
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',  // Assuming you have a Farm model
    required: true
  },
   plotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record',
    // Not required to maintain backward compatibility
  }
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);