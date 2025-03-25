import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CropLandCostTrckingResultSummaryFarm.css";

const CostTracking = ({ farmId, plotId, disabled }) => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [formData, setFormData] = useState({
    equipmentCost: "",
    materialCost: "",
    laborCost: "",
    transportCost: "",
    miscCost: "",
    date: "",
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

  const handleActivityChange = (e) => {
    setSelectedActivity(e.target.value);
    setFormData({
      ...formData,
      equipmentCost: "",
      materialCost: "",
      laborCost: "",
      transportCost: "",
      miscCost: "",
      date: "",
      notes: "",
      farmId: farmId, // Keep farmId
      plotId: plotId   // Keep plotId
    });
    setError(null);
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      const token = localStorage.getItem('token');
      
      // Ensure farmId and plotId are included in the submission
      const dataToSubmit = {
        activity: selectedActivity,
        ...formData,
        farmId: farmId,
        plotId: plotId
      };
      
      const response = await axios.post(
        'http://localhost:5000/api/cost-tracking/create',
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setSuccessMessage('Cost Tracking Record Saved Successfully!');
        // Reset form but keep farmId and plotId
        setSelectedActivity("");
        setFormData({
          equipmentCost: "",
          materialCost: "",
          laborCost: "",
          transportCost: "",
          miscCost: "",
          date: "",
          notes: "",
          farmId: farmId, // Keep farmId
          plotId: plotId   // Keep plotId
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving cost tracking record');
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cost Tracking</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {!farmId && <div className="error-message">No farm selected. Please select a farm first.</div>}
      {farmId && !plotId && <div className="error-message">No plot selected. Please select a plot first.</div>}
      
      <form onSubmit={handleSubmit}>
        <select
          name="activity"
          value={selectedActivity}
          onChange={handleActivityChange}
          required
          disabled={disabled || !farmId || !plotId}
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
              min="0"
              disabled={disabled || !farmId || !plotId}
            />
            <input
              type="number"
              name="materialCost"
              placeholder="Material Cost"
              value={formData.materialCost}
              onChange={handleChange}
              required
              min="0"
              disabled={disabled || !farmId || !plotId}
            />
            <input
              type="number"
              name="laborCost"
              placeholder="Labor Cost"
              value={formData.laborCost}
              onChange={handleChange}
              required
              min="0"
              disabled={disabled || !farmId || !plotId}
            />
            <input
              type="number"
              name="transportCost"
              placeholder="Transport Cost"
              value={formData.transportCost}
              onChange={handleChange}
              required
              min="0"
              disabled={disabled || !farmId || !plotId}
            />
            <input
              type="number"
              name="miscCost"
              placeholder="Miscellaneous Cost"
              value={formData.miscCost}
              onChange={handleChange}
              required
              min="0"
              disabled={disabled || !farmId || !plotId}
            />
            <input
              type="date"
              name="date"
              value={formData.date}
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
          </>
        )}
        <button 
          type="submit" 
          className="button"
          disabled={loading || !selectedActivity || !farmId || !plotId}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default CostTracking;