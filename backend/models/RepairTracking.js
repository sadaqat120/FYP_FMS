const mongoose = require("mongoose");

const RepairTrackingSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  resourceId: { type: String, required: true }, // Ensure this is a string
  maintenanceType: { type: String, required: true },
  maintenanceCost: { type: Number, required: true },
  dateOfMaintenance: { type: Date, required: true }, // Make date required
  notes: { type: String, default: "" },
});

module.exports = mongoose.model("RepairTracking", RepairTrackingSchema);
