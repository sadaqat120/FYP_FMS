// Updated frontend component
import React, { useState } from "react";
import axios from "axios";
import "./CropLandCostTrckingResultSummaryFarm.css";

const LandRecord = () => {
  const [formData, setFormData] = useState({
    plotName: "",
    area: "",
    location: "",
    soilType: "",
    landType: "",
    landSuitability: "",
    additionalNotes: "",
    farmFormId: "" // You'll need to provide this from your farm form context/state
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get token from localStorage or your auth state management
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        'http://localhost:5000/api/records/create',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        alert('Land Record Saved Successfully!');
        // Clear form
        setFormData({
          plotName: "",
          area: "",
          location: "",
          soilType: "",
          landType: "",
          landSuitability: "",
          additionalNotes: "",
          farmFormId: ""
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving land record');
      alert(error.response?.data?.message || 'Error saving land record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Land Record</h2>
      {error && <div className="error-message">{error}</div>}
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
          name="additionalNotes"
          placeholder="Additional Notes"
          value={formData.additionalNotes}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default LandRecord;