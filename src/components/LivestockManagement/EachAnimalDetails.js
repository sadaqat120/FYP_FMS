import React, { useState } from "react";

const EachAnimalDetails = ({ category }) => {
  const [animals, setAnimals] = useState([
    {
      id: 1,
      sex: "Male",
      breed: "Holstein",
      feedType: "Hay, Silage",
      description: "Healthy and active",
      age: "3 years",
      lastUpdated: {
        feedQuantity: "15 kg",
        milkingQuantity: "0 liters",
        healthStatus: "Healthy",
        livingStatus: "Alive",
        weight: "500 kg",
        updatedDate: "2025-01-05"
      }
    },
    {
      id: 2,
      sex: "Female",
      breed: "Jersey",
      feedType: "Grain, Grass",
      description: "Excellent milk producer",
      age: "5 years",
      lastUpdated: {
        feedQuantity: "20 kg",
        milkingQuantity: "20 liters",
        healthStatus: "Fit",
        livingStatus: "Alive",
        weight: "450 kg",
        updatedDate: "2025-01-06"
      }
    }
  ]);

  const handleEdit = (id) => {
    const updatedAnimals = animals.map((animal) =>
      animal.id === id
        ? {
            ...animal,
            lastUpdated: {
              ...animal.lastUpdated,
              healthStatus: "Updated Health",
              updatedDate: new Date().toISOString().split("T")[0]
            }
          }
        : animal
    );
    setAnimals(updatedAnimals);
    alert("Details updated successfully!");
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-4">
      <h3 className="text-xl font-bold text-green-600 mb-4">{category} - Each Animal Details</h3>
      {animals.map((animal) => (
        <div
          key={animal.id}
          className="bg-white p-4 rounded-lg shadow-lg mb-4"
        >
          {/* General Details */}
          <div className="mb-4">
            <h4 className="text-lg font-bold text-gray-700">General Details</h4>
            <ul className="list-disc ml-6">
              <li>ID: {animal.id}</li>
              <li>Sex: {animal.sex}</li>
              <li>Breed: {animal.breed}</li>
              <li>Feed Type: {animal.feedType}</li>
              <li>Description: {animal.description}</li>
              <li>Age: {animal.age}</li>
            </ul>
          </div>

          {/* Last Updated Details */}
          <div className="mb-4">
            <h4 className="text-lg font-bold text-gray-700">Last Updated Details</h4>
            <ul className="list-disc ml-6">
              <li>Feed Quantity: {animal.lastUpdated.feedQuantity}</li>
              <li>Milking Quantity: {animal.lastUpdated.milkingQuantity}</li>
              <li>Health Status: {animal.lastUpdated.healthStatus}</li>
              <li>Living Status: {animal.lastUpdated.livingStatus}</li>
              <li>Weight: {animal.lastUpdated.weight}</li>
              <li>Updated Date: {animal.lastUpdated.updatedDate}</li>
            </ul>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => handleEdit(animal.id)}
            className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700"
          >
            Edit Last Updated Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default EachAnimalDetails;
