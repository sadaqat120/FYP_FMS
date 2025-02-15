const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
    crop_name: { type: String, required: true },
    planting_date: { type: Date, required: true },
    harvest_date: { type: Date, required: true },
    field_location: { type: String, required: true },
    soil_type: { type: String, required: true },
    status: { type: String, enum: ["Planted", "Growing", "Harvested"], default: "Planted" }
});

module.exports = mongoose.model("Crop", cropSchema);
