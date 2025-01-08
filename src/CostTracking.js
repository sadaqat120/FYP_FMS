import React, { useState } from "react";
import "./CropLandCostTrckingResultSummaryFarm.css"
const CostTracking = () => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [formData, setFormData] = useState({
    equipmentCost: "",
    materialCost: "",
    laborCost: "",
    transportCost: "",
    miscCost: "",
    date: "",
    notes: "",
  });

  const handleActivityChange = (e) => {
    setSelectedActivity(e.target.value);
    setFormData({
      equipmentCost: "",
      materialCost: "",
      laborCost: "",
      transportCost: "",
      miscCost: "",
      date: "",
      notes: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cost Tracking Saved Successfully!");
  };

  return (
    <div className="form-container">
      <h2>Cost Tracking</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="activity"
          value={selectedActivity}
          onChange={handleActivityChange}
          required
        >
          <option value="">Select Activity</option>
          <option value="landPreparation">Land Preparation</option>
          <option value="seedSelection">Seed Selection and Sowing</option>
          <option value="irrigation">Irrigation</option>
          <option value="fertilization">Fertilization</option>
          <option value="weedControl">Weed Control</option>
          <option value="pestManagement">Pest Management</option>
          <option value="harvesting">Harvesting</option>
          <option value="postHarvesting">Post-Harvesting</option>
        </select>

        {selectedActivity && (
          <>
            <input
              type="number"
              name="equipmentCost"
              placeholder="Equipment Cost"
              value={formData.equipmentCost}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="materialCost"
              placeholder="Material Cost"
              value={formData.materialCost}
              onChange={handleChange}
            />
            <input
              type="number"
              name="laborCost"
              placeholder="Labor Cost"
              value={formData.laborCost}
              onChange={handleChange}
            />
            <input
              type="number"
              name="transportCost"
              placeholder="Transport Cost"
              value={formData.transportCost}
              onChange={handleChange}
            />
            <input
              type="number"
              name="miscCost"
              placeholder="Miscellaneous Cost"
              value={formData.miscCost}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <textarea
              name="notes"
              placeholder="Additional Notes"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </>
        )}
        <button type="submit" className="button">
          Save
        </button>
      </form>
    </div>
  );
};

export default CostTracking;
