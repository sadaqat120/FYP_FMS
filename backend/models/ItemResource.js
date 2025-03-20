const mongoose = require("mongoose");

const ItemResourceSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  resourceType: { type: String, required: true },
  resourceName: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true }, // Unique ID for the resource
  quantity: { type: Number, required: true },
  costPerItem: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  condition: { type: String, required: true },
  notes: { type: String, default: "" },
  dateAdded: { type: Date, required: true }, // Make date required
});

module.exports = mongoose.model("ItemResource", ItemResourceSchema);
