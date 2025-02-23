// Updated frontend component
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CropLandCostTrckingResultSummaryFarm.css";

const CropRecord = () => {
  const [formData, setFormData] = useState({
    season: "",
    cropType: "",
    cropName: "",
    duration: "",
    notes: "",
    // farmFormId: "" // You'll need to provide this from your farm form context/state
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

    try {
      // Get token from localStorage or your auth state management
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        'http://localhost:5000/api/crop-records/create',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setSuccessMessage('Crop Record Saved Successfully!');
        // Clear form
        setFormData({
          season: "",
          cropType: "",
          cropName: "",
          duration: "",
          notes: "",
          // farmFormId: ""
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving crop record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Crop Record</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
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
        <button 
          type="submit" 
          className="button"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default CropRecord;

// // Optional: Add some CSS for messages
// // Add to your CSS file
// .error-message {
//   color: #dc3545;
//   background-color: #f8d7da;
//   border: 1px solid #f5c6cb;
//   border-radius: 4px;
//   padding: 10px;
//   margin-bottom: 15px;
// }

// .success-message {
//   color: #28a745;
//   background-color: #d4edda;
//   border: 1px solid #c3e6cb;
//   border-radius: 4px;
//   padding: 10px;
//   margin-bottom: 15px;
// }

// .button:disabled {
//   background-color: #cccccc;
//   cursor: not-allowed;
// }