const mongoose = require("mongoose");

const CostTrackingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cropFarmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CropFarm",
      required: true,
    },
    activity: {
      type: String,
      enum: [
        "landPreparation",
        "seedSelection",
        "irrigation",
        "fertilization",
        "weedControl",
        "pestManagement",
        "harvesting",
        "postHarvesting",
      ],
      required: true,
    },
    equipmentCost: { type: Number, required: true },
    materialCost: { type: Number, required: true },
    laborCost: { type: Number, required: true },
    transportCost: { type: Number, required: true },
    miscCost: { type: Number, required: true },
    date: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CostTracking", CostTrackingSchema);
