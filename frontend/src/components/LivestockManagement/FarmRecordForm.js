import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmRecordForm = ({ farmId }) => {
  const [farmData, setFarmData] = useState({
    name: "",
    location: "",
    totalLivestockCount: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchFarmData = async () => {
      if (!farmId) {
        console.error("Farm ID is undefined");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/farms/${farmId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setFarmData({
          name: response.data.name,
          location: response.data.location || "",
          totalLivestockCount: response.data.totalLivestockCount || "",
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching farm data:", error);
        setIsLoading(false);
      }
    };

    fetchFarmData();
  }, [farmId]);

  const handleSave = async () => {
    const newErrors = {};
    setErrors({});
    setSuccessMsg("");

    if (!farmData.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!farmData.totalLivestockCount) {
      newErrors.totalLivestockCount = "Livestock count is required.";
    } else if (
      isNaN(farmData.totalLivestockCount) ||
      farmData.totalLivestockCount < 0
    ) {
      newErrors.totalLivestockCount =
        "Total livestock count must be a valid number.";
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
          totalLivestockCount: farmData.totalLivestockCount,
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
      {/* <h3 className="text-lg font-bold text-green-600">Farm Record</h3> */}
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
            value={farmData.totalLivestockCount}
            onChange={(e) =>
              setFarmData({ ...farmData, totalLivestockCount: e.target.value })
            }
            className="w-full border rounded-lg p-2"
            required
          />
          {errors.totalLivestockCount && (
            <p className="text-red-500 text-sm">{errors.totalLivestockCount}</p>
          )}
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
