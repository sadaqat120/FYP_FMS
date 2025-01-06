import React, { useState } from "react";
import EachAnimalDetails from "./EachAnimalDetails";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AnimalCategoryDetails = ({ category, total }) => {
  const [showEachAnimal, setShowEachAnimal] = useState(false);

  const pieData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [20, 35], // Example ratio for Male/Female
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"]
      }
    ]
  };

  const handleShowEachAnimal = () => {
    setShowEachAnimal(!showEachAnimal);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-4">
      {/* Category Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-green-600">{category} Details</h3>
        <h3 className="text-lg font-semibold text-gray-700">
          Total: {total} (Alive: {total - 5})
        </h3>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {["Sex", "Breed", "Age", "Health Status", "Feeding Type", "Milking Quantity"].map(
          (field, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <h4 className="text-center text-lg font-bold mb-4">{field}</h4>
              <Pie data={pieData} />
            </div>
          )
        )}
      </div>

      {/* Show Each Animal Button */}
      <button
        onClick={handleShowEachAnimal}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full"
      >
        {showEachAnimal ? "Hide Each Animal Details" : "Show Each Animal Details"}
      </button>

      {/* Show Each Animal Details */}
      {showEachAnimal && <EachAnimalDetails category={category} />}
    </div>
  );
};

export default AnimalCategoryDetails;
