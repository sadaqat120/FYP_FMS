import React, { useState } from "react";
import Dashboard from "./Dashboard";
import ManageResources from "./ManageResources";

const ResourceManagement = ({ onBackToLanding }) => {
  const [storeName, setStoreName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleDialogSubmit = (e) => {
    e.preventDefault();
    if (storeName.trim()) {
      setIsDialogOpen(false);
    } else {
      alert("Please enter a store name.");
    }
  };

  return (
    <div className="p-4">
      {/* Dialog to Enter Store Name */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              Enter Store Name
            </h2>
            <form onSubmit={handleDialogSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter store name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
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
            {storeName || "Resource Management"}
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
                activeTab === "manageResources"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveTab("manageResources")}
            >
              Manage Resources
            </button>
          </div>

          {activeTab === "dashboard" ? (
            <Dashboard storeName={storeName} />
          ) : (
            <ManageResources />
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

export default ResourceManagement;
