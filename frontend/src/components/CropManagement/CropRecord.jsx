import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CropLandCostTrckingResultSummaryFarm.css";

const CropRecord = ({ farmId, plotId, disabled }) => {
  const [formData, setFormData] = useState({
    season: "",
    cropType: "",
    cropName: "",
    duration: "",
    notes: "",
    farmId: "", // Will store the farmId
    plotId: ""  // Will store the plotId
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Update formData when farmId or plotId prop changes
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      farmId: farmId || "",
      plotId: plotId || ""
    }));
  }, [farmId, plotId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any previous error/success messages when user starts typing
    setError(null);
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    // Validate farmId and plotId
    if (!farmId) {
      setError("Farm ID is missing. Please ensure you're in a valid farm context.");
      setLoading(false);
      return;
    }

    if (!plotId) {
      setError("Plot ID is missing. Please select a plot first.");
      setLoading(false);
      return;
    }

    try {
      // Get token from localStorage or your auth state management
      const token = localStorage.getItem('token');
      
      // Ensure farmId and plotId are included in the submission
      const dataToSubmit = {
        ...formData,
        farmId: farmId,
        plotId: plotId
      };
      
      const response = await axios.post(
        'http://localhost:5000/api/crop-records/create',
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setSuccessMessage('Crop Record Saved Successfully!');
        // Clear form but keep the farmId and plotId
        setFormData({
          season: "",
          cropType: "",
          cropName: "",
          duration: "",
          notes: "",
          farmId: farmId,
          plotId: plotId
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving crop record');
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Crop Record</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {!farmId && <div className="error-message">No farm selected. Please select a farm first.</div>}
      {farmId && !plotId && <div className="error-message">No plot selected. Please select a plot first.</div>}
      
      <form onSubmit={handleSubmit}>
        <select
          name="season"
          value={formData.season}
          onChange={handleChange}
          required
          disabled={disabled || !farmId || !plotId}
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
          disabled={disabled || !farmId || !plotId}
        />
        <input
          type="text"
          name="cropName"
          placeholder="Crop Name (e.g., Wheat)"
          value={formData.cropName}
          onChange={handleChange}
          required
          disabled={disabled || !farmId || !plotId}
        />
        <input
          type="text"
          name="duration"
          placeholder="Expected Duration (e.g., 120 days)"
          value={formData.duration}
          onChange={handleChange}
          required
          disabled={disabled || !farmId || !plotId}
        />
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          disabled={disabled || !farmId || !plotId}
        ></textarea>
        <button 
          type="submit" 
          className="button"
          disabled={loading || !farmId || !plotId}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default CropRecord;