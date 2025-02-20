import React, { useState } from "react";
import Dashboard from "./Dashboard";
import ManageLivestock from "./ManageLivestock";

const LivestockManagement = ({ onBackToLanding }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [farmName, setFarmName] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(true);

  const handleDialogSubmit = (e) => {
    e.preventDefault();
    if (farmName.trim()) {
      setDialogOpen(false);
    } else {
      alert("Please enter a farm name.");
    }
  };

  return (
    <div className="p-4">
      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              Enter Livestock Farm Name
            </h2>
            <form onSubmit={handleDialogSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter your farm name"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="p-3 border rounded-lg"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isDialogOpen && (
        <>
          <h1 className="text-center text-3xl font-bold text-green-600 mb-6">
            {farmName || "Livestock Management"}
          </h1>
          <div className="flex justify-center gap-6 mb-6">
            <button
              className={`py-2 px-4 rounded-lg ${
                activeTab === "dashboard"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`py-2 px-4 rounded-lg ${
                activeTab === "manageLivestock"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveTab("manageLivestock")}
            >
              Manage Livestock
            </button>
          </div>

          {activeTab === "dashboard" ? (
            <Dashboard />
          ) : (
            <ManageLivestock />
          )}

          <button
            onClick={onBackToLanding}
            className="mt-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Back to Services
          </button>
        </>
      )}
    </div>
  );
};

export default LivestockManagement;
