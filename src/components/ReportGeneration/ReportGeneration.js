import React, { useState } from "react";
import CropReport from "./CropReport";
import ResourceReport from "./ResourceReport";

const ReportGeneration = ({ onBackToLanding }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsReportGenerated(false);
  };

  const renderSelectedReport = () => {
    if (selectedOption === "Crop Management Report") {
      return <CropReport />;
    }
    if (selectedOption === "Resource Management Report") {
      return <ResourceReport />;
    }
    return null;
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Report Generation
      </h1>
      {!selectedOption ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Select a Report Type
          </h2>
          <div className="flex justify-center gap-6">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              onClick={() => handleOptionSelect("Crop Management Report")}
            >
              Crop Management Report
            </button>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              onClick={() => handleOptionSelect("Resource Management Report")}
            >
              Resource Management Report
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBackToLanding}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              Back to Services
            </button>
            <button
              onClick={() => setSelectedOption("")}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            >
              Back to Report Selection
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              {selectedOption}
            </h2>
            {renderSelectedReport()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportGeneration;
