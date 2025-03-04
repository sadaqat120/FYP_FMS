import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmRecordForm = ({ farmId }) => {
  const [farmData, setFarmData] = useState({
    name: "",
    location: "",
    totalLivestockCount: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFarmData = async () => {
      if (!farmId) {
        console.error("Farm ID is undefined");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/farms/${farmId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
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
    if (!farmData.location || !farmData.totalLivestockCount) {
      alert("Please fill in all fields.");
      return;
    }

    if (isNaN(farmData.totalLivestockCount) || farmData.totalLivestockCount < 0) {
      alert("Total livestock count must be a valid number.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/farms/${farmId}`, {
        location: farmData.location,
        totalLivestockCount: farmData.totalLivestockCount,
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      alert("Data Saved Successfully!");
    } catch (error) {
      console.error("Error saving farm data:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 border p-4 rounded-lg">
      <h3 className="text-lg font-bold text-green-600">Farm Record</h3>
      <form className="space-y-4">
        <input
          type="text"
          value={farmData.name}
          className="w-full border rounded-lg p-2"
          readOnly
        />
        <input
          type="text"
          placeholder="Location"
          value={farmData.location}
          onChange={(e) => setFarmData({ ...farmData, location: e.target.value })}
          className="w-full border rounded-lg p-2"
          required
        />
        <input
          type="number"
          placeholder="Total Livestock Count"
          value={farmData.totalLivestockCount}
          onChange={(e) => setFarmData({ ...farmData, totalLivestockCount: e.target.value })}
          className="w-full border rounded-lg p-2"
          required
        />
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
