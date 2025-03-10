import React, { useEffect, useState } from "react";
import EachAnimalDetails from "./EachAnimalDetails";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AnimalCategoryDetails = ({ category, farmId }) => {
  const [showEachAnimal, setShowEachAnimal] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [sexData, setSexData] = useState({ male: 0, female: 0 });
  const [breedData, setBreedData] = useState({});
  const [ageData, setAgeData] = useState({ "<5 years": 0, "5-10 years": 0, ">10 years": 0 });
  const [healthStatusData, setHealthStatusData] = useState({ healthy: 0, sick: 0, recovering: 0 });
  const [feedTypeData, setFeedTypeData] = useState({});
  const [milkingQuantityData, setMilkingQuantityData] = useState({ "<5 liters": 0, "5-10 liters": 0, ">10 liters": 0 });

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:5000/animals/farm/${farmId}`, {
          headers: { Authorization: token }, // ✅ Added token for authentication
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`); // ✅ Improved error handling
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("API response is not an array:", data); // ✅ Check if response is an array
          return;
        }

        const filteredAnimals = data.filter(animal => animal.category === category);
        setAnimals(filteredAnimals);

        // ✅ Initialize counters
        const sexCount = { male: 0, female: 0 };
        const breedCount = {};
        const ageCount = { "<5 years": 0, "5-10 years": 0, ">10 years": 0 };
        const healthCount = { healthy: 0, sick: 0, recovering: 0 };
        const feedCount = {};
        const milkingCount = { "<5 liters": 0, "5-10 liters": 0, ">10 liters": 0 };

        filteredAnimals.forEach(animal => {
          // Count sex
          sexCount[animal.sex] = (sexCount[animal.sex] || 0) + 1;

          // Count breed
          breedCount[animal.breed] = (breedCount[animal.breed] || 0) + 1;

          // Count age
          if (animal.age < 5) ageCount["<5 years"]++;
          else if (animal.age <= 10) ageCount["5-10 years"]++;
          else ageCount[">10 years"]++;

          // Count health status
          healthCount[animal.healthStatus] = (healthCount[animal.healthStatus] || 0) + 1;

          // Count feed type
          feedCount[animal.feedType] = (feedCount[animal.feedType] || 0) + 1;

          // Count milking quantity
          if (animal.milkingQuantity < 5) milkingCount["<5 liters"]++;
          else if (animal.milkingQuantity <= 10) milkingCount["5-10 liters"]++;
          else milkingCount[">10 liters"]++;
        });

        setSexData(sexCount);
        setBreedData(breedCount);
        setAgeData(ageCount);
        setHealthStatusData(healthCount);
        setFeedTypeData(feedCount);
        setMilkingQuantityData(milkingCount);
      } catch (error) {
        console.error("Error fetching animal data:", error.message);
      }
    };

    fetchAnimalData();
  }, [category, farmId]);

  const pieDataConfigs = {
    Sex: {
      labels: ["Male", "Female"],
      data: [sexData.male, sexData.female],
      backgroundColor: ["#FF6384", "#36A2EB"],
    },
    Breed: {
      labels: Object.keys(breedData),
      data: Object.values(breedData),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
    Age: {
      labels: Object.keys(ageData),
      data: Object.values(ageData),
      backgroundColor: ["#FF9F40", "#4BC0C0", "#9966FF"],
    },
    "Health Status": {
      labels: Object.keys(healthStatusData),
      data: Object.values(healthStatusData),
      backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
    },
    "Feeding Type": {
      labels: Object.keys(feedTypeData),
      data: Object.values(feedTypeData),
      backgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF"],
    },
    "Milking Quantity": {
      labels: Object.keys(milkingQuantityData),
      data: Object.values(milkingQuantityData),
      backgroundColor: ["#9966FF", "#36A2EB", "#FFCE56"],
    },
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-green-600">{category} Details</h3>
        <h3 className="text-lg font-semibold text-gray-700">
          Total: {animals.length} (Alive: {animals.filter(animal => animal.status === "alive").length})
        </h3>
      </div>

      {/* Pie Charts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {Object.entries(pieDataConfigs).map(([key, { labels, data, backgroundColor }], index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <h4 className="text-center text-lg font-bold mb-4">{key}</h4>
            <div style={{ width: "100%", maxWidth: "240px", height: "240px" }}>
              <Pie
                data={{
                  labels,
                  datasets: [{ data, backgroundColor, hoverBackgroundColor: backgroundColor }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Show Each Animal Details */}
      <button
        onClick={() => setShowEachAnimal(!showEachAnimal)}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full"
      >
        {showEachAnimal ? "Hide Each Animal Details" : "Show Each Animal Details"}
      </button>

      {showEachAnimal && <EachAnimalDetails category={category} />}
    </div>
  );
};

export default AnimalCategoryDetails;
