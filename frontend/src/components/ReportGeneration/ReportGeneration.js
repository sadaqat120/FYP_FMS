import React, { useState } from "react";
import CropReport from "./CropReport";
import ResourceReport from "./ResourceReport";

const ReportGeneration = ({ onBackToLanding }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderSelectedReport = () => {
    if (selectedOption === "Crop Management Report") return <CropReport />;
    if (selectedOption === "Resource Management Report") return <ResourceReport />;
    return null;
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <h1 className="text-4xl font-extrabold text-emerald-700 mb-8 text-center drop-shadow">
        Record Builder
      </h1>

      {!selectedOption ? (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-xl text-center border border-emerald-200">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            Select a Record Type
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button
              onClick={() => handleOptionSelect("Crop Management Report")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-medium py-3 px-6 rounded-lg shadow hover:scale-105 transition"
            >
              Crop Farms Record
            </button>
            <button
              onClick={() => handleOptionSelect("Resource Management Report")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-medium py-3 px-6 rounded-lg shadow hover:scale-105 transition"
            >
              Resources Stores Record
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setSelectedOption("")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              ← Record Selection
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
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
