import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmRecordForm = ({ farmId }) => {
  const [farmData, setFarmData] = useState({
    name: "",
    location: "",
  });

  const [livestockCount, setLivestockCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchFarmAndAnimalData = async () => {
      if (!farmId) {
        console.error("Farm ID is undefined");
        return;
      }

      try {
        // Fetch farm
        const farmResponse = await axios.get(
          `http://localhost:5000/farms/${farmId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setFarmData({
          name: farmResponse.data.name,
          location: farmResponse.data.location || "",
        });

        // Fetch animals for this farm and count them
        const animalResponse = await axios.get(
          `http://localhost:5000/animals/farm/${farmId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setLivestockCount(animalResponse.data.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching farm or animals:", error);
        setIsLoading(false);
      }
    };

    fetchFarmAndAnimalData();
  }, [farmId]);

  const handleSave = async () => {
    const newErrors = {};
    setErrors({});
    setSuccessMsg("");

    if (!farmData.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/farms/${farmId}`,
        {
          location: farmData.location,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setSuccessMsg("Farm data saved successfully!");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (error) {
      console.error("Error saving farm data:", error);
      setErrors({ general: "Failed to save farm data. Please try again." });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 border p-4 rounded-lg">
      {successMsg && (
        <p className="text-green-600 text-center font-medium">{successMsg}</p>
      )}
      {errors.general && (
        <p className="text-red-500 text-center font-medium">{errors.general}</p>
      )}
      <form className="space-y-4">
        <input
          type="text"
          value={farmData.name}
          className="w-full border rounded-lg p-2 bg-gray-100"
          readOnly
        />

        <div>
          <input
            type="text"
            placeholder="Location"
            value={farmData.location}
            onChange={(e) =>
              setFarmData({ ...farmData, location: e.target.value })
            }
            className="w-full border rounded-lg p-2"
            required
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Total Livestock Count"
            value={livestockCount}
            disabled
            className="w-full border rounded-lg p-2 bg-gray-100 text-gray-700"
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default FarmRecordForm;
