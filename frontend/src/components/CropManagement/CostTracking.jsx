// Updated frontend component
import React, { useState } from "react";
import axios from "axios";
import "./CropLandCostTrckingResultSummaryFarm.css";

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

    // // Validate farmId
    // if (!farmId) {
    //   setError("Farm ID is missing. Please ensure you're in a valid farm context.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        'http://localhost:5000/api/cost-tracking/create',
        {
          activity: selectedActivity,
          ...formData,
          // farmFormId: farmId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setSuccessMessage('Cost Tracking Record Saved Successfully!');
        // Reset form
        setSelectedActivity("");
        setFormData({
          equipmentCost: "",
          materialCost: "",
          laborCost: "",
          transportCost: "",
          miscCost: "",
          date: "",
          notes: "",
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving cost tracking record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cost Tracking</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
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
              min="0"
            />
            <input
              type="number"
              name="materialCost"
              placeholder="Material Cost"
              value={formData.materialCost}
              onChange={handleChange}
              required
              min="0"
            />
            <input
              type="number"
              name="laborCost"
              placeholder="Labor Cost"
              value={formData.laborCost}
              onChange={handleChange}
              required
              min="0"
            />
            <input
              type="number"
              name="transportCost"
              placeholder="Transport Cost"
              value={formData.transportCost}
              onChange={handleChange}
              required
              min="0"
            />
            <input
              type="number"
              name="miscCost"
              placeholder="Miscellaneous Cost"
              value={formData.miscCost}
              onChange={handleChange}
              required
              min="0"
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
        <button 
          type="submit" 
          className="button"
          disabled={loading  || !selectedActivity}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default CostTracking;