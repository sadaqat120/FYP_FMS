const mongoose = require("mongoose");

const UnitResourceSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  resourceType: { type: String, required: true },
  resourceName: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true }, // Unique ID for the resource
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  costPerUnit: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  notes: { type: String, default: "" },
  dateAdded: { type: Date, required: true },
});

module.exports = mongoose.model("UnitResource", UnitResourceSchema);
