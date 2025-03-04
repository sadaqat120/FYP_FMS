import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import ManageLivestock from "./ManageLivestock";

const LivestockManagement = ({ onBackToLanding }) => {
  const [farms, setFarms] = useState([]);
  const [farmName, setFarmName] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [activeFarm, setActiveFarm] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editFarmName, setEditFarmName] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [farmToDelete, setFarmToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/farms", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setFarms(response.data);
      } catch (error) {
        console.error("Error fetching farms:", error);
      }
    };

    fetchFarms();
  }, []);

  const handleDialogSubmit = async (e) => {
    e.preventDefault();
    if (farmName.trim()) {
      try {
        const response = await axios.post("http://localhost:5000/farms", { name: farmName }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setFarms([...farms, response.data]);
        setFarmName("");
        setDialogOpen(false);
      } catch (error) {
        console.error("Error adding farm:", error);
      }
    } else {
      alert("Please enter a farm name.");
    }
  };

  const handleEditFarm = async (farmId) => {
    try {
      const response = await axios.put(`http://localhost:5000/farms/nameEditing/${farmId}`, { name: editFarmName }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setFarms(farms.map(farm => farm._id === farmId ? response.data : farm));
      setEditDialogOpen(false);
      setEditFarmName("");
    } catch (error) {
      console.error("Error updating farm:", error);
    }
  };

  const handleDeleteFarm = async (farmId) => {
    try {
      await axios.delete(`http://localhost:5000/farms/${farmId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setFarms(farms.filter(farm => farm._id !== farmId));
      setDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting farm:", error);
    }
  };

  const handleFarmClick = (farm) => {
    setActiveFarm(farm);
    setFarmName(farm.name); // Set the farm name to display
  };

  return (
    <div className="p-4">
      {/* Main Content */}
      {activeFarm ? (
        <>
          <h1 className="text-center text-3xl font-bold text-green-600 mb-6">
            {activeFarm.name}
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
            <ManageLivestock activeFarmId={activeFarm._id} />
          )}
        </>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold text-green-600 mb-6">
            Your Livestock Farms
          </h1>
          <div className="flex flex-col items-center">
            {farms.length > 0 ? (
              farms.map((farm) => (
                <div key={farm._id} className="flex justify-between items-center w-full max-w-md mb-2">
                  <span
                    className="text-lg cursor-pointer hover:text-blue-600"
                    onClick={() => handleFarmClick(farm)}
                  >
                    {farm.name}
                  </span>
                  <div>
                    <button
                      onClick={() => {
                        setEditFarmName(farm.name);
                        setActiveFarm(farm);
                        setEditDialogOpen(true);
                      }}
                      className="bg-blue-500 text-white py-1 px-2 rounded-lg mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setFarmToDelete(farm._id);
                        setDeleteConfirmation(true);
                      }}
                      className="bg-red-500 text-white py-1 px-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No farms found. Please add a new farm.</p>
            )}
            <button
              onClick={() => setDialogOpen(true)}
              className="bg-green-600 text-white py-2 px-4 rounded-lg mt-4"
            >
              Add New Farm
            </button>
          </div>
        </>
      )}

      {/* Dialog Box for Adding New Farm */}
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
                Add Farm
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Farm Dialog */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              Edit Farm Name
            </h2>
            <input
              type="text"
              value={editFarmName}
              onChange={(e) => setEditFarmName(e.target.value)}
              className="p-3 border rounded-lg mb-4"
              required
            />
            <button
              onClick={() => handleEditFarm(activeFarm._id)}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditDialogOpen(false)}
              className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Are you sure you want to delete this farm?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => handleDeleteFarm(farmToDelete)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirmation(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onBackToLanding}
        className="mt-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
      >
        Back to Services
      </button>
    </div>
  );
};

export default LivestockManagement;
