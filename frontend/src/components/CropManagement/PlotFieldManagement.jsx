import React, { useState, useEffect } from "react";
import axios from "axios";
import LandRecord from "./LandRecord";
import CropRecord from "./CropRecord";
import CostTracking from "./CostTracking";
import ResultSummary from "./ResultSummary";
import "./PlotFieldManagement.css";

const PlotFieldManagement = ({ farmName, farmId }) => {
  const [activeSection, setActiveSection] = useState("");
  const [plots, setPlots] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch plots when farmId changes
  useEffect(() => {
    if (farmId) {
      fetchPlots();
    }
  }, [farmId]);

  const fetchPlots = async () => {
    setIsLoading(true);
    setError("");
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
    } catch (err) {
      // setError("Error fetching plots: " + (err.response?.data?.message || err.message));
      console.log("Error fetching plots:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlotCreated = (newPlot) => {
    setPlots(prevPlots => [...prevPlots, newPlot]);
    setSelectedPlot(newPlot);
  };

  const handlePlotSelect = (plot) => {
    setSelectedPlot(plot);
  };

  // Define a function that passes the farmId and plotId to the active section
  const renderActiveSection = (section) => {
    switch (section) {
      case "landRecord":
        return <LandRecord farmId={farmId} onPlotCreated={handlePlotCreated} />;
      case "cropRecord":
        return <CropRecord 
          farmId={farmId} 
          plotId={selectedPlot?._id} 
          disabled={!selectedPlot} 
        />;
      case "costTracking":
        return <CostTracking 
          farmId={farmId} 
          plotId={selectedPlot?._id} 
          disabled={!selectedPlot} 
        />;
      case "resultSummary":
        return <ResultSummary 
          farmId={farmId} 
          plotId={selectedPlot?._id} 
          disabled={!selectedPlot} 
        />;
      default:
        return <p>Select an option to get started.</p>;
    }
  };

  return (
    <div className="plot-field-management">
      <div className="management-sidebar">
        <div className="management-options">
          <button 
            className={activeSection === "landRecord" ? "active" : ""} 
            onClick={() => setActiveSection("landRecord")}
          >
            Land Record
          </button>
          <button 
            className={activeSection === "cropRecord" ? "active" : ""} 
            onClick={() => setActiveSection("cropRecord")}
          >
            Crop Record
          </button>
          <button 
            className={activeSection === "costTracking" ? "active" : ""} 
            onClick={() => setActiveSection("costTracking")}
          >
            Cost Tracking
          </button>
          <button 
            className={activeSection === "resultSummary" ? "active" : ""} 
            onClick={() => setActiveSection("resultSummary")}
          >
            Result Summary
          </button>
        </div>

        {plots.length > 0 && activeSection !== "landRecord" && (
          <div className="plot-selector">
            <h3>Select Plot</h3>
            {isLoading ? (
              <p>Loading plots...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : (
              <ul>
                {plots.map(plot => (
                  <li 
                    key={plot._id} 
                    className={selectedPlot?._id === plot._id ? "selected" : ""}
                    onClick={() => handlePlotSelect(plot)}
                  >
                    {plot.plotName} - {plot.area} acres
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="form-container">
        {activeSection !== "landRecord" && !selectedPlot && plots.length > 0 && (
          <div className="warning-message">Please select a plot from the sidebar to continue.</div>
        )}
        {renderActiveSection(activeSection)}
      </div>
    </div>
  );
};

export default PlotFieldManagement;