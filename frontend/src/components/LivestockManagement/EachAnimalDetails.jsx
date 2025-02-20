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
    const [feedQuantityValue, feedQuantityUnit] = animal.lastUpdated.feedQuantity.split(" ");
    const [milkingQuantityValue, milkingQuantityUnit] = animal.lastUpdated.milkingQuantity.split(" ");
    const [weightValue, weightUnit] = animal.lastUpdated.weight.split(" ");
    setEditData({
      ...animal.lastUpdated,
      feedQuantityValue,
      feedQuantityUnit,
      milkingQuantityValue,
      milkingQuantityUnit,
      weightValue,
      weightUnit,
    });
  };

  const handleSave = () => {
    const updatedData = {
      feedQuantity: `${editData.feedQuantityValue} ${editData.feedQuantityUnit}`,
      milkingQuantity: `${editData.milkingQuantityValue} ${editData.milkingQuantityUnit}`,
      healthStatus: editData.healthStatus,
      livingStatus: editData.livingStatus,
      weight: `${editData.weightValue} ${editData.weightUnit}`,
      updatedDate: editData.updatedDate,
    };
    setAnimals((prevAnimals) =>
      prevAnimals.map((animal) =>
        animal.id === editingId ? { ...animal, lastUpdated: updatedData } : animal
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
        <div key={animal.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
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
                <div>
                  <label>Feed Quantity</label>
                  <input
                    type="number"
                    value={editData.feedQuantityValue}
                    onChange={(e) => handleChange("feedQuantityValue", e.target.value)}
                    placeholder="Quantity"
                    className="p-2 border rounded-lg"
                  />
                  <select
                    value={editData.feedQuantityUnit}
                    onChange={(e) => handleChange("feedQuantityUnit", e.target.value)}
                    className="p-2 border rounded-lg"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                  </select>
                </div>
                <div>
                  <label>Milking Quantity</label>
                  <input
                    type="number"
                    value={editData.milkingQuantityValue}
                    onChange={(e) => handleChange("milkingQuantityValue", e.target.value)}
                    placeholder="Quantity"
                    className="p-2 border rounded-lg"
                  />
                  <select
                    value={editData.milkingQuantityUnit}
                    onChange={(e) => handleChange("milkingQuantityUnit", e.target.value)}
                    className="p-2 border rounded-lg"
                  >
                    <option value="liters">liters</option>
                    <option value="ml">ml</option>
                  </select>
                </div>
                <div>
                  <label>Health Status</label>
                  <select
                    value={editData.healthStatus}
                    onChange={(e) => handleChange("healthStatus", e.target.value)}
                    className="p-2 border rounded-lg"
                  >
                    <option value="Healthy">Healthy</option>
                    <option value="Sick">Sick</option>
                    <option value="Recovered">Recovered</option>
                  </select>
                </div>
                <div>
                  <label>Living Status</label>
                  <select
                    value={editData.livingStatus}
                    onChange={(e) => handleChange("livingStatus", e.target.value)}
                    className="p-2 border rounded-lg"
                  >
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="Lost">Lost</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
                <div>
                  <label>Weight</label>
                  <input
                    type="number"
                    value={editData.weightValue}
                    onChange={(e) => handleChange("weightValue", e.target.value)}
                    placeholder="Weight"
                    className="p-2 border rounded-lg"
                  />
                  <select
                    value={editData.weightUnit}
                    onChange={(e) => handleChange("weightUnit", e.target.value)}
                    className="p-2 border rounded-lg"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                  </select>
                </div>
                <div>
                  <label>Updated Date</label>
                  <input
                    type="date"
                    value={editData.updatedDate}
                    onChange={(e) => handleChange("updatedDate", e.target.value)}
                    className="p-2 border rounded-lg"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 col-span-2"
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
