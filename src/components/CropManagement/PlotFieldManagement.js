import React, { useState } from "react";
import LandRecord from "./LandRecord";
import CropRecord from "./CropRecord";
import CostTracking from "./CostTracking";
import ResultSummary from "./ResultSummary";
import "./PlotFieldManagement.css";

const PlotFieldManagement = () => {
  const [activeSection, setActiveSection] = useState("");

  return (
    <div className="plot-field-management">
      <div className="management-options">
        <button onClick={() => setActiveSection("landRecord")}>Land Record</button>
        <button onClick={() => setActiveSection("cropRecord")}>Crop Record</button>
        <button onClick={() => setActiveSection("costTracking")}>Cost Tracking</button>
        <button onClick={() => setActiveSection("resultSummary")}>Result Summary</button>
      </div>
      <div className="form-container">{renderActiveSection(activeSection)}</div>
    </div>
  );
};

const renderActiveSection = (section) => {
  switch (section) {
    case "landRecord":
      return <LandRecord />;
    case "cropRecord":
      return <CropRecord />;
    case "costTracking":
      return <CostTracking />;
    case "resultSummary":
      return <ResultSummary />;
    default:
      return <p>Select an option to get started.</p>;
  }
};

export default PlotFieldManagement;
