import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserLocation = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/auth/user", {
            headers: {
              Authorization: token,
            },
          });
          if (response.data.location) {
            setCurrentLocation(response.data.location);
          }
        } catch (error) {
          console.error("Error fetching user location:", error);
        }
      }
    };

    fetchUserLocation();
  }, []);

  const handleAddLocation = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newLocation) {
      setError("Location cannot be empty.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put("http://localhost:5000/auth/user/location", { location: newLocation }, {
        headers: {
          Authorization: token,
        },
      });
      setCurrentLocation(newLocation);
      setNewLocation("");
      setIsEditing(false);
      alert("Location updated successfully!");
    } catch (error) {
      console.error("Error updating location:", error);
      setError("Failed to update location.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Edit Location</h2>
      {currentLocation ? (
        <div>
          <p className="mb-2">Current Location: {currentLocation}</p>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="New Location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
              <button type="submit" className="bg-[#4caf50] text-white p-2 rounded">Save</button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          ) : (
            <button onClick={handleAddLocation} className="bg-[#4caf50] text-white p-2 rounded">Change Location</button>
          )}
        </div>
      ) : (
        <div>
          <button onClick={handleAddLocation} className="bg-[#4caf50] text-white p-2 rounded">Add Location</button>
          {isEditing && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="New Location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
              <button type="submit" className="bg-[#4caf50] text-white p-2 rounded">Save</button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Location;
