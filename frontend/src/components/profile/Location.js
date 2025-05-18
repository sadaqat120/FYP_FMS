import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // ✅ success message state

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get("http://localhost:5000/auth/user", {
          headers: { Authorization: token },
        });
        setCurrentLocation(data.location || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!newLocation) {
      setError("Location is required.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        "http://localhost:5000/auth/user/location",
        { location: newLocation },
        { headers: { Authorization: token } }
      );
      setCurrentLocation(newLocation);
      setNewLocation("");
      setIsEditing(false);
      setSuccessMsg("Location updated successfully."); // ✅ success shown inline
      setTimeout(() => setSuccessMsg(""), 2000);        // ✅ auto-hide
    } catch {
      setError("Error saving location.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Your Location</h2>

      {/* ✅ Inline success message */}
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

      {/* Current location display */}
      {currentLocation && (
        <p className="mb-4">
          Current: <strong>{currentLocation}</strong>
        </p>
      )}

      {/* Form or edit button */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            placeholder="New Location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="input input-bordered w-full"
          />
          {/* Inline error */}
          {error && <p className="text-red-600">{error}</p>}
          <button className="btn w-full bg-green-600 text-white hover:bg-green-700">
            Save
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="btn bg-green-600 text-white hover:bg-green-700"
        >
          {currentLocation ? "Change Location" : "Add Location"}
        </button>
      )}
    </div>
  );
};

export default Location;
