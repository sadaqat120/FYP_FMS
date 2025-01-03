import React, { useState } from "react";
import Dashboard from "./Dashboard";
import PlotFieldManagement from "./PlotFieldManagement";
import "./CropManagement.css";

const CropManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // Default to Dashboard

  return (
    <div className="crop-management">
      <h1 className="centered-title">Crop Management</h1>
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
    </div>
  );
};

export default CropManagement;
