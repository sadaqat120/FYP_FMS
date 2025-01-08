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
        updatedDate: "2025-01-05",
      },
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
        updatedDate: "2025-01-06",
      },
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleEdit = (id) => {
    const animal = animals.find((a) => a.id === id);
    setEditingId(id);
    setEditData(animal.lastUpdated);
  };

  const handleSave = () => {
    setAnimals((prevAnimals) =>
      prevAnimals.map((animal) =>
        animal.id === editingId
          ? { ...animal, lastUpdated: editData }
          : animal
      )
    );
    setEditingId(null);
    setEditData(null);
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-4">
      <h3 className="text-xl font-bold text-green-600 mb-4">{category} - Each Animal Details</h3>
      {animals.map((animal) => (
        <div
          key={animal.id}
          className="bg-white p-4 rounded-lg shadow-lg mb-4"
        >
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

          <div className="mb-4">
            <h4 className="text-lg font-bold text-gray-700">Last Updated Details</h4>
            {editingId === animal.id ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(editData).map((key) => (
                  <input
                    key={key}
                    type="text"
                    value={editData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder={key}
                    className="p-2 border rounded-lg"
                  />
                ))}
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            ) : (
              <ul className="list-disc ml-6">
                {Object.entries(animal.lastUpdated).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
