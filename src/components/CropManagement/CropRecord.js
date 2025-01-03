import React, { useState } from "react";
import "./CropLandCostTrckingResultSummaryFarm.css"

const CropRecord = () => {
  const [formData, setFormData] = useState({
    season: "",
    cropType: "",
    cropName: "",
    duration: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Crop Record Saved Successfully!");
  };

  return (
    <div className="form-container">
      <h2>Crop Record</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="season"
          value={formData.season}
          onChange={handleChange}
          required
        >
          <option value="">Select Season</option>
          <option value="rabi">Rabi</option>
          <option value="kharif">Kharif</option>
        </select>
        <input
          type="text"
          name="cropType"
          placeholder="Crop Type (e.g., Cereal)"
          value={formData.cropType}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cropName"
          placeholder="Crop Name (e.g., Wheat)"
          value={formData.cropName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Expected Duration (e.g., 120 days)"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="button">
          Save
        </button>
      </form>
    </div>
  );
};

export default CropRecord;
