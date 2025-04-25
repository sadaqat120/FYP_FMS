import React, { useState } from "react";
import LandRecord from "./LandRecord";
import CropRecord from "./CropRecord";
import CostTracking from "./CostTracking";
import ResultSummary from "./ResultSummary";

const PlotFieldManagement = () => {
  const [activeSection, setActiveSection] = useState("");

  return (
    <div className="p-5">
      <div className="flex justify-around my-5">
        <button
          onClick={() => setActiveSection("landRecord")}
          className="px-5 py-2 text-lg bg-green-500 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-green-600"
        >
          Land Record
        </button>
        <button
          onClick={() => setActiveSection("cropRecord")}
          className="px-5 py-2 text-lg bg-green-500 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-green-600"
        >
          Crop Record
        </button>
        <button
          onClick={() => setActiveSection("costTracking")}
          className="px-5 py-2 text-lg bg-green-500 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-green-600"
        >
          Cost Tracking
        </button>
        <button
          onClick={() => setActiveSection("resultSummary")}
          className="px-5 py-2 text-lg bg-green-500 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-green-600"
        >
          Result Summary
        </button>
      </div>
      <div className="mt-5">{renderActiveSection(activeSection)}</div>
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
      return <p className="text-center text-gray-600 text-xl mt-10">Select an option to get started.</p>;
  }
};

export default PlotFieldManagement;
