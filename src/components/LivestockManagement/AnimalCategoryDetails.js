import React, { useState } from "react";
import EachAnimalDetails from "./EachAnimalDetails";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AnimalCategoryDetails = ({ category, total }) => {
  const [showEachAnimal, setShowEachAnimal] = useState(false);

  // Chart data configurations
  const pieDataConfigs = {
    Sex: {
      labels: ["Male", "Female"],
      data: [40, 60],
      backgroundColor: ["#FF6384", "#36A2EB"],
    },
    Breed: {
      labels: ["Breed A", "Breed B", "Breed C"],
      data: [30, 50, 20],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
    Age: {
      labels: ["<5 years", "5-10 years", ">10 years"],
      data: [25, 55, 20],
      backgroundColor: ["#FF9F40", "#4BC0C0", "#9966FF"],
    },
    "Health Status": {
      labels: ["Healthy", "Sick", "Recovering"],
      data: [70, 20, 10],
      backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
    },
    "Feeding Type": {
      labels: ["Hay", "Grain", "Silage"],
      data: [50, 30, 20],
      backgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF"],
    },
    "Milking Quantity": {
      labels: [">10 liters", "5-10 liters", "<5 liters"],
      data: [40, 30, 30],
      backgroundColor: ["#9966FF", "#36A2EB", "#FFCE56"],
    },
  };

  const handleShowEachAnimal = () => {
    setShowEachAnimal(!showEachAnimal);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-green-600">{category} Details</h3>
        <h3 className="text-lg font-semibold text-gray-700">
          Total: {total} (Alive: {total - 5})
        </h3>
      </div>

      {/* Pie Charts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {Object.entries(pieDataConfigs).map(([key, { labels, data, backgroundColor }], index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
            style={{ height: "250px", maxWidth: "100%" }}
          >
            <h4 className="text-center text-lg font-bold mb-4">{key}</h4>
            <Pie
              data={{
                labels,
                datasets: [
                  {
                    data,
                    backgroundColor,
                    hoverBackgroundColor: backgroundColor,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: true,
                responsive: true,
              }}
              height={100}
              width={100}
            />
          </div>
        ))}
      </div>

      {/* Show Each Animal Details */}
      <button
        onClick={handleShowEachAnimal}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full"
      >
        {showEachAnimal ? "Hide Each Animal Details" : "Show Each Animal Details"}
      </button>

      {showEachAnimal && <EachAnimalDetails category={category} />}
    </div>
  );
};

export default AnimalCategoryDetails;
