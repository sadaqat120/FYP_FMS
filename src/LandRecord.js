import React, { useState } from "react";
import "./CropLandCostTrckingResultSummaryFarm.css";

const LandRecord = () => {
  const [formData, setFormData] = useState({
    plotName: "",
    area: "",
    location: "",
    soilType: "",
    landType: "",
    landSuitability: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Land Record Saved Successfully!");
  };

  return (
    <div className="form-container">
      <h2>Land Record</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="plotName"
          placeholder="Plot Name/ID"
          value={formData.plotName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="area"
          placeholder="Area (Acres/Kanals)"
          value={formData.area}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="soilType"
          placeholder="Soil Type (e.g., Sandy, Clay)"
          value={formData.soilType}
          onChange={handleChange}
          required
        />
        <select
          name="landType"
          value={formData.landType}
          onChange={handleChange}
          required
        >
          <option value="">Select Land Type</option>
          <option value="irrigated">Irrigated</option>
          <option value="rainfed">Rainfed</option>
        </select>
        <textarea
          name="landSuitability"
          placeholder="Land Suitability (e.g., Suitable for wheat)"
          value={formData.landSuitability}
          onChange={handleChange}
        ></textarea>
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

export default LandRecord;
