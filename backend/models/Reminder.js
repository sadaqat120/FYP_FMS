const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  managementType: { type: String, enum: ["Crop", "Livestock", "Resource"], required: true },
  locationName: { type: String, required: true },
  purpose: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Reminder", ReminderSchema);
