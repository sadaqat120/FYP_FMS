import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import Dashboard from "./Dashboard";
import ManageLivestock from "./ManageLivestock";
import bgImage from "../../assets/livetsock-page-background-piture-01.jpg";

const NAVBAR_HEIGHT = 80;

const LivestockManagement = ({ onBackToLanding }) => {
  const [farms, setFarms] = useState([]);
  const [farmName, setFarmName] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [activeFarm, setActiveFarm] = useState(null);
  const [farmBeingEdited, setFarmBeingEdited] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editFarmName, setEditFarmName] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [farmToDelete, setFarmToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/farms", {
          headers: { Authorization: localStorage.getItem("token") },
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
    setFormError("");

    if (!farmName.trim()) {
      setFormError("Farm name is required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/farms",
        { name: farmName },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setFarms([...farms, response.data]);
      setFarmName("");
      setDialogOpen(false);
    } catch (error) {
      setFormError("Error adding farm. Try again.");
    }
  };

  const handleEditFarm = async () => {
    if (!editFarmName.trim()) {
      setFormError("Farm name cannot be empty.");
      setTimeout(() => setFormError(""), 2000);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/farms/${farmBeingEdited._id}`,
        { name: editFarmName },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setFarms(farms.map(f => f._id === farmBeingEdited._id ? response.data : f));

      // If the farm being edited is also the active one, update its display
      if (activeFarm && activeFarm._id === farmBeingEdited._id) {
        setActiveFarm(response.data);
      }

      setEditFarmName("");
      setFarmBeingEdited(null);
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Edit error:", error);
      setFormError("Error updating farm.");
      setTimeout(() => setFormError(""), 2000);
    }
  };

  const handleDeleteFarm = async (farmId) => {
    try {
      await axios.delete(`http://localhost:5000/farms/${farmId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setFarms(farms.filter((farm) => farm._id !== farmId));
      setDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting farm:", error);
    }
  };

  const handleFarmClick = (farm) => {
    setActiveFarm(farm);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden text-gray-900"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
        paddingTop: `${NAVBAR_HEIGHT + 60}px`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

      {/* Action Bar */}
      <div className="w-full fixed top-[80px] z-40 text-white flex justify-between items-center px-6 py-3 bg-opacity-70">
        <button
          onClick={() => (activeFarm ? setActiveFarm(null) : onBackToLanding())}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          ⬅ {activeFarm ? "Back" : "Services"}
        </button>
        {!activeFarm && (
          <button
            onClick={() => setDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            ➕ Add New Farm
          </button>
        )}
      </div>

      <div className="relative z-10 p-6 pb-20">
        {activeFarm ? (
          <>
            <h1 className="text-4xl font-bold text-white text-center mb-6 drop-shadow-lg">
              {activeFarm.name}
            </h1>
            <div className="flex justify-center gap-4 mb-6">
              {["dashboard", "manageLivestock"].map((tab) => (
                <button
                  key={tab}
                  className={`px-5 py-2 rounded-md font-semibold ${
                    activeTab === tab
                      ? "bg-green-700 text-white"
                      : "bg-white text-green-800"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "dashboard" ? "Dashboard" : "Manage Livestock"}
                </button>
              ))}
            </div>
            {activeTab === "dashboard" ? (
              <Dashboard activeFarmId={activeFarm._id} />
            ) : (
              <ManageLivestock activeFarmId={activeFarm._id} />
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-white bg-opacity-40 py-2 rounded">
              Your Livestock Farms
            </h2>
            <div className="max-w-2xl mx-auto bg-white bg-opacity-90 p-6 rounded-lg shadow space-y-4">
              {farms.length > 0 ? (
                farms.map((farm) => (
                  <div
                    key={farm._id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span
                      onClick={() => handleFarmClick(farm)}
                      className="cursor-pointer font-semibold hover:text-green-600"
                    >
                      {farm.name}
                    </span>
                    <div className="flex gap-3">
                      <FaEdit
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => {
                          setEditFarmName(farm.name);
                          setFarmBeingEdited(farm);
                          setEditDialogOpen(true);
                        }}
                      />
                      <FaTrash
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => {
                          setFarmToDelete(farm._id);
                          setDeleteConfirmation(true);
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">No farms found.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Add Farm Modal */}
      {isDialogOpen && (
        <Modal onClose={() => setDialogOpen(false)}>
          <h2 className="text-xl font-bold text-green-700 mb-4 border-b pb-2 text-center">
            Add New Farm
          </h2>
          {formError && <p className="text-red-500 mb-2">{formError}</p>}
          <form onSubmit={handleDialogSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter farm name"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
            >
              Add Farm
            </button>
          </form>
        </Modal>
      )}

      {/* Edit Farm Modal */}
      {isEditDialogOpen && (
        <Modal onClose={() => setEditDialogOpen(false)}>
          <h2 className="text-xl font-bold text-green-700 mb-4 border-b pb-2 text-center">
            Edit Farm Name
          </h2>
          {formError && <p className="text-red-500 mb-2">{formError}</p>}
          <input
            type="text"
            value={editFarmName}
            onChange={(e) => setEditFarmName(e.target.value)}
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            onClick={handleEditFarm}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
          >
            Save Changes
          </button>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <Modal onClose={() => setDeleteConfirmation(false)}>
          <h2 className="text-lg font-semibold text-red-700 mb-4">
            Are you sure you want to delete this farm?
          </h2>
          <div className="flex justify-between">
            <button
              onClick={() => handleDeleteFarm(farmToDelete)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setDeleteConfirmation(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Reusable Modal
const Modal = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <FaTimes
          className="absolute top-3 right-4 text-red-600 cursor-pointer text-xl"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default LivestockManagement;
