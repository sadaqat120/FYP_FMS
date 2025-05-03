const mongoose = require("mongoose");

const CropRecordSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cropFarmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CropFarm",
      required: true,
    },
    season: { type: String, enum: ["rabi", "kharif"], required: true },
    cropType: { type: String, required: true },
    cropName: { type: String, required: true },
    duration: { type: Number, required: true }, // in days
    seedQuantity: { type: Number, required: true },
    seedingDate: { type: String, required: true },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CropRecord", CropRecordSchema);
