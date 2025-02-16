const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
    crop_name: { type: String, required: true, trim: true },
    planting_date: { type: Date, required: true },
    harvest_date: { type: Date, required: true },
    field_location: { type: String, required: true, trim: true },
    soil_type: { type: String, required: true, trim: true },
    status: { 
        type: String, 
        enum: ["Planted", "Growing", "Harvested", "Diseased"], 
        default: "Planted" 
    }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("Crop", cropSchema);
