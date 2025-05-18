import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import Dashboard from "./Dashboard";
import ManageResources from "./ManageResources";
import bgImage from "../../assets/resources-page-background-piture-01.jpg";

const NAVBAR_HEIGHT = 80;

const ResourcesManagement = ({ onBackToLanding }) => {
  const [stores, setStores] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeStore, setActiveStore] = useState(null);
  const [storeBeingEdited, setStoreBeingEdited] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editStoreName, setEditStoreName] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("http://localhost:5000/stores", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  const handleDialogSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!storeName.trim()) {
      setErrorMsg("Store name is required.");
      setTimeout(() => setErrorMsg(""), 2000);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/stores",
        { name: storeName },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setStores([...stores, response.data]);
      setStoreName("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding store:", error);
      setErrorMsg("Error adding store.");
    }
  };

  const handleEditStore = async () => {
    if (!editStoreName.trim()) {
      setErrorMsg("Store name is required.");
      setTimeout(() => setErrorMsg(""), 2000);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/stores/${storeBeingEdited._id}`,
        { name: editStoreName },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setStores(stores.map(s => s._id === storeBeingEdited._id ? response.data : s));
      if (activeStore && activeStore._id === storeBeingEdited._id) {
        setActiveStore(response.data);
      }
      setEditStoreName("");
      setStoreBeingEdited(null);
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating store:", error);
      setErrorMsg("Error updating store.");
    }
  };

  const handleDeleteStore = async (storeId) => {
    try {
      await axios.delete(`http://localhost:5000/stores/${storeId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setStores(stores.filter((store) => store._id !== storeId));
      setDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting store:", error);
    }
  };

  const handleStoreClick = (store) => {
    setActiveStore(store);
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden text-gray-900 ${
        !activeStore ? "bg-cover" : "bg-white"
      }`}
      style={
        !activeStore
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: "center bottom",
              backgroundSize: "cover",
              paddingTop: `${NAVBAR_HEIGHT + 60}px`,
            }
          : { paddingTop: `${NAVBAR_HEIGHT + 60}px` }
      }
    >
      {!activeStore && (
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
      )}

      {/* Action Bar */}
      <div className="w-full fixed top-[80px] z-40 text-white flex justify-between items-center px-6 py-3 bg-opacity-70">
        <button
          onClick={() =>
            activeStore ? setActiveStore(null) : onBackToLanding()
          }
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          ⬅ {activeStore ? "Back" : "Services"}
        </button>
        {!activeStore && (
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            ➕ Add New Store
          </button>
        )}
      </div>

      <div className="relative z-10 p-6 pb-20">
        {activeStore ? (
          <>
            <h1 className="text-4xl font-bold text-green-700 text-center mb-6 drop-shadow-lg">
              {activeStore.name}
            </h1>
            <div className="flex justify-center gap-4 mb-6">
              {["dashboard", "manageResources"].map((tab) => (
                <button
                  key={tab}
                  className={`px-5 py-2 rounded-md font-semibold ${
                    activeTab === tab
                      ? "bg-green-700 text-white"
                      : "bg-white text-green-800"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "dashboard" ? "Dashboard" : "Manage Resources"}
                </button>
              ))}
            </div>
            {activeTab === "dashboard" ? (
              <Dashboard storeId={activeStore._id} />
            ) : (
              <ManageResources storeId={activeStore._id} />
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-white bg-opacity-40 py-2 rounded">
              Your Resource Stores
            </h2>
            <div className="max-w-2xl mx-auto bg-white bg-opacity-90 p-6 rounded-lg shadow space-y-4">
              {stores.length > 0 ? (
                stores.map((store) => (
                  <div
                    key={store._id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span
                      onClick={() => handleStoreClick(store)}
                      className="cursor-pointer font-semibold hover:text-green-600"
                    >
                      {store.name}
                    </span>
                    <div className="flex gap-3">
                      <FaEdit
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => {
                          setEditStoreName(store.name);
                          setStoreBeingEdited(store);
                          setEditDialogOpen(true);
                        }}
                      />
                      <FaTrash
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => {
                          setStoreToDelete(store._id);
                          setDeleteConfirmation(true);
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">No stores found.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Add Modal */}
      {isDialogOpen && (
        <Modal onClose={() => setIsDialogOpen(false)}>
          <h2 className="text-xl font-bold text-green-700 mb-4 border-b pb-2 text-center">
            Add New Store
          </h2>
          {errorMsg && <p className="text-red-500 mb-2 text-center">{errorMsg}</p>}
          <form onSubmit={handleDialogSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter Store Name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
            >
              Add Store
            </button>
          </form>
        </Modal>
      )}

      {/* Edit Modal */}
      {isEditDialogOpen && (
        <Modal onClose={() => setEditDialogOpen(false)}>
          <h2 className="text-xl font-bold text-green-700 mb-4 border-b pb-2 text-center">
            Edit Store Name
          </h2>
          {errorMsg && <p className="text-red-500 mb-2 text-center">{errorMsg}</p>}
          <input
            type="text"
            value={editStoreName}
            onChange={(e) => setEditStoreName(e.target.value)}
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            onClick={handleEditStore}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
          >
            Save Changes
          </button>
        </Modal>
      )}

      {/* Delete Modal */}
      {deleteConfirmation && (
        <Modal onClose={() => setDeleteConfirmation(false)}>
          <h2 className="text-lg font-semibold text-red-700 mb-4">
            Are you sure you want to delete this store?
          </h2>
          <div className="flex justify-between">
            <button
              onClick={() => handleDeleteStore(storeToDelete)}
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

export default ResourcesManagement;
