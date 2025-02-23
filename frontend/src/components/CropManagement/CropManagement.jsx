// CropManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import PlotFieldManagement from "./PlotFieldManagement";
import "./CropManagement.css";

const CropManagement = () => {
  const [farmName, setFarmName] = useState("");
  const [farmId, setFarmId] = useState(""); // Add this state
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:5000/api";

  const getAuthToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };

  const handleFarmNameSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const token = getAuthToken();
    if (!token) {
      setError("No authentication token found. Please login again.");
      setIsLoading(false);
      return;
    }

    try {
      if (farmName.trim() === "") {
        setError("Please enter a valid farm name.");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        `${API_URL}/farms/create`,
        { farmName: farmName.trim() },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setFarmId(response.data.farm._id); // Store the farm ID
        setIsDialogOpen(false);
      }
    } catch (err) {
      console.error('Error details:', err.response?.data || err);
      setError(err.response?.data?.message || "An error occurred while saving the farm.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="crop-management">
      {isDialogOpen ? (
        <div className="dialog-box">
          <h2>Enter Farm Name</h2>
          <form onSubmit={handleFarmNameSubmit}>
            <input
              type="text"
              placeholder="Enter your farm name"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              disabled={isLoading}
              required
            />
            {error && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? "Processing..." : "Next"}
            </button>
          </form>
        </div>
      ) : (
        <>
          <h1 className="centered-title">{farmName}</h1>
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`tab-button ${
                activeTab === "plotFieldManagement" ? "active" : ""
              }`}
              onClick={() => setActiveTab("plotFieldManagement")}
            >
              Plot/Field Management
            </button>
          </div>
          {activeTab === "dashboard" && <Dashboard farmName={farmName} farmId={farmId} />}
          {activeTab === "plotFieldManagement" && (
            <PlotFieldManagement farmName={farmName} farmId={farmId} />
          )}
        </>
      )}
    </div>
  );
};

export default CropManagement;