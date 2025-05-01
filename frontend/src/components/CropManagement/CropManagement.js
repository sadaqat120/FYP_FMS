import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import PlotFieldManagement from "./PlotFieldManagement";

const CropManagement = ({ onBackToLanding }) => {
  const [stores, setStores] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeStore, setActiveStore] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editStoreName, setEditStoreName] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("http://localhost:5000/CropFarm", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching CropFarms:", error);
      }
    };

    fetchStores();
  }, []);

  const handleDialogSubmit = async (e) => {
    e.preventDefault();
    if (storeName.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/CropFarm",
          { name: storeName },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setStores([...stores, response.data]);
        setStoreName("");
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error adding CropFarm:", error);
      }
    } else {
      alert("Please enter a CropFarm name.");
    }
  };

  const handleEditStore = async (storeId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/CropFarm/${storeId}`,
        { name: editStoreName },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setStores(
        stores.map((store) =>
          store._id === storeId ? response.data : store
        )
      );
      setEditDialogOpen(false);
      setEditStoreName("");
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

  const handleDeleteStore = async (storeId) => {
    try {
      await axios.delete(`http://localhost:5000/CropFarm/${storeId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setStores(stores.filter((store) => store._id !== storeId));
      setDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting CropFarm:", error);
    }
  };

  const handleStoreClick = (store) => {
    setActiveStore(store);
    setStoreName(store.name);
  };

  return (
    <div className="p-5 w-full">
      {activeStore ? (
        <>
          <h1 className="text-4xl font-bold text-green-700 text-center mb-6">
            {activeStore.name}
          </h1>
          <div className="flex justify-center gap-6 mb-6">
            <button
              className={`py-2 px-5 text-base font-semibold rounded-md ${
                activeTab === "dashboard"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`py-2 px-5 text-base font-semibold rounded-md ${
                activeTab === "manageResources"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveTab("manageResources")}
            >
              PlotFieldManagement
            </button>
          </div>
          {activeTab === "dashboard" ? (
            <Dashboard storeName={activeStore.name} storeId={activeStore._id} />
          ) : (
            <PlotFieldManagement cropFarmId={activeStore._id} />
          )}
        </>
      ) : (
        <>
          <h1 className="text-center text-4xl font-bold text-green-700 mb-6">
            Your CropFarms
          </h1>
          <div className="flex flex-col items-center">
            {stores.length > 0 ? (
              stores.map((store) => (
                <div key={store._id} className="flex justify-between items-center w-full max-w-md mb-3">
                  <span
                    className="text-lg cursor-pointer hover:text-blue-600"
                    onClick={() => handleStoreClick(store)}
                  >
                    {store.name}
                  </span>
                  <div>
                    <button
                      onClick={() => {
                        setEditStoreName(store.name);
                        setActiveStore(store);
                        setEditDialogOpen(true);
                      }}
                      className="bg-blue-500 text-white py-1 px-3 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setStoreToDelete(store._id);
                        setDeleteConfirmation(true);
                      }}
                      className="bg-red-500 text-white py-1 px-3 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-lg text-center mt-8">
                No CropFarm found. Please add a new CropFarm.
              </p>
            )}
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-green-600 text-white py-2 px-4 rounded-lg mt-6 hover:bg-green-700"
            >
              Add New CropFarm
            </button>
          </div>
        </>
      )}

      {/* Add Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center">
            <h2 className="text-2xl text-green-700 font-semibold mb-4">
              Enter CropFarm Name
            </h2>
            <form onSubmit={handleDialogSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter store name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="p-3 border rounded-lg shadow-inner"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Add CropFarm
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center">
            <h2 className="text-2xl text-green-700 font-semibold mb-4">
              Edit CropFarm Name
            </h2>
            <input
              type="text"
              value={editStoreName}
              onChange={(e) => setEditStoreName(e.target.value)}
              className="p-3 border rounded-lg shadow-inner mb-4"
              required
            />
            <button
              onClick={() => handleEditStore(activeStore._id)}
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

      {/* Delete Confirmation */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center">
            <h2 className="text-2xl text-red-700 font-semibold mb-4">
              Are you sure you want to delete this CropFarm?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDeleteStore(storeToDelete)}
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

export default CropManagement;
