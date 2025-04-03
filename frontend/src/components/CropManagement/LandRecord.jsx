import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CropLandCostTrckingResultSummaryFarm.css";

const LandRecord = ({ farmId, onPlotCreated }) => {
  const [formData, setFormData] = useState({
    plotName: "",
    area: "",
    location: "",
    soilType: "",
    landType: "",
    areaUnit: "",
    landSuitability: "",
    additionalNotes: "",
    farmId: "" // This will store the farmId
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [plots, setPlots] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Update formData when farmId prop changes
  useEffect(() => {
    if (farmId) {
      setFormData(prevData => ({
        ...prevData,
        farmId: farmId
      }));
      // Fetch existing plots for this farm
      fetchPlots();
    }
  }, [farmId]);

  // Fetch existing plots for the farm
  const fetchPlots = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/records/farm/${farmId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        setPlots(response.data.records);
      }
    } catch (error) {
      console.error("Error fetching plots:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage("");
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      // Make sure farmId is included in the submission
      const dataToSubmit = {
        ...formData,
        farmId: farmId // Ensure farmId is set correctly
      };
      
      const response = await axios.post(
        'http://localhost:5000/api/records/create',
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setSuccessMessage('Land Record Saved Successfully!');
        
        // Add the new plot to the list
        const newPlot = response.data.record;
        setPlots(prevPlots => [...prevPlots, newPlot]);
        
        // Notify parent component about the newly created plot
        if (onPlotCreated) {
          onPlotCreated(newPlot);
        }
        
        // Clear form but keep the farmId
        setFormData({
          plotName: "",
          area: "",
          location: "",
          soilType: "",
          landType: "",
          areaUnit:"",
          landSuitability: "",
          additionalNotes: "",
          farmId: farmId // Keep the farmId for future submissions
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving land record');
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Land Record</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {!farmId && <div className="error-message">No farm selected. Please select a farm first.</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="plotName"
          placeholder="Plot Name/ID"
          value={formData.plotName}
          onChange={handleChange}
          required
          disabled={!farmId}
        />
        <input
          type="number"
          name="area"
          placeholder="Area (Acres/Kanals)"
          value={formData.area}
          onChange={handleChange}
          required
          disabled={!farmId}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          disabled={!farmId}
        />
        <input
          type="text"
          name="soilType"
          placeholder="Soil Type (e.g., Sandy, Clay)"
          value={formData.soilType}
          onChange={handleChange}
          required
          disabled={!farmId}
        />
        <select
          name="landType"
          value={formData.landType}
          onChange={handleChange}
          required
          disabled={!farmId}
        >
          <option value="">Select Land Type</option>
          <option value="irrigated">Irrigated</option>
          <option value="rainfed">Rainfed</option>
        </select>


        {/* <input
          type="text"
          name="Area Unit"
          placeholder="Area Unit (e.g., kanal, acre)"
          value={formData.areaUnit}
          onChange={handleChange}
          required
          disabled={!farmId}
        /> */}
        <select
          name="areaUnit"
          value={formData.areaUnit}
          onChange={handleChange}
          required
          disabled={!farmId}
        >
          <option value="">Select Area Unit</option>
          <option value="kanal">Kanal</option>
          <option value="acree">Acre</option>
        </select>


        <textarea
          name="landSuitability"
          placeholder="Land Suitability (e.g., Suitable for wheat)"
          value={formData.landSuitability}
          onChange={handleChange}
          disabled={!farmId}
        ></textarea>
        <textarea
          name="additionalNotes"
          placeholder="Additional Notes"
          value={formData.additionalNotes}
          onChange={handleChange}
          disabled={!farmId}
        ></textarea>
        <button type="submit" className="button" disabled={loading || !farmId}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>

      {plots.length > 0 && (
        <div className="plots-list">
          <h3>Existing Plots</h3>
          <ul>
            {plots.map(plot => (
              <li key={plot._id}>
                <strong>{plot.plotName}</strong> - {plot.area} acres, {plot.location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LandRecord;