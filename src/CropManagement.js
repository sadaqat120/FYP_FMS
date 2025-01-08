import React, { useState } from "react";
import Dashboard from "./Dashboard";
import PlotFieldManagement from "./PlotFieldManagement";
import "./CropManagement.css";

const CropManagement = () => {
  const [farmName, setFarmName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard"); // Default to Dashboard

  const handleFarmNameSubmit = (e) => {
    e.preventDefault();
    if (farmName.trim() !== "") {
      setIsDialogOpen(false);
    } else {
      alert("Please enter a valid farm name.");
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
              required
            />
            <button type="submit" className="button">
              Next
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
              className={`tab-button ${activeTab === "plotFieldManagement" ? "active" : ""}`}
              onClick={() => setActiveTab("plotFieldManagement")}
            >
              Plot/Field Management
            </button>
          </div>
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "plotFieldManagement" && <PlotFieldManagement />}
        </>
      )}
    </div>
  );
};

export default CropManagement;
