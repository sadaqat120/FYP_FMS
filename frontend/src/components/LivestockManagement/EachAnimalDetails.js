import React, { useEffect, useState } from "react";

const EachAnimalDetails = ({ category, farmId }) => {
  const [animals, setAnimals] = useState([]);
  const [searchId, setSearchId] = useState(""); // Search input state
  const [filteredAnimal, setFilteredAnimal] = useState(null); // Store searched animal
  const [searchError, setSearchError] = useState(""); // Store search error message

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Fetch token

        const response = await fetch(`http://localhost:5000/animals/farm/${farmId}`, {
          headers: { Authorization: token }, // ✅ Add token to headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("API response is not an array:", data);
          return;
        }

        const filteredAnimals = data.filter(animal => animal.category === category);
        setAnimals(filteredAnimals);
      } catch (error) {
        console.error("Error fetching animal data:", error);
      }
    };

    fetchAnimalData();
  }, [category, farmId]);

  const handleSearch = () => {
    if (!searchId.trim()) {
      setFilteredAnimal(null);
      setSearchError("Please enter an Animal ID.");
      return;
    }

    const foundAnimal = animals.find(animal => animal.animalId === searchId);
    if (foundAnimal) {
      setFilteredAnimal(foundAnimal);
      setSearchError(""); // Clear error if found
    } else {
      setFilteredAnimal(null);
      setSearchError("No animal found with this ID.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-4">
      <h3 className="text-xl font-bold text-green-600 mb-4">{category} - Each Animal Details</h3>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter Animal ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="p-2 border rounded-lg mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Display Search Error (if any) */}
      {searchError && <p className="text-red-600 mb-4">{searchError}</p>}

      {/* Display Animal(s) */}
      {filteredAnimal ? (
        <AnimalCard animal={filteredAnimal} isHighlighted={true} />
      ) : (
        animals.map(animal => <AnimalCard key={animal._id} animal={animal} isHighlighted={false} />)
      )}
    </div>
  );
};

/**
 * 🆕 Reusable Animal Card Component (No Repetition!)
 */
const AnimalCard = ({ animal, isHighlighted }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-lg mb-4 ${isHighlighted ? "border-2 border-blue-500" : ""}`}>
      <h4 className="text-lg font-bold text-gray-700">Animal Details</h4>
      <ul className="list-disc ml-6">
        <li><strong>Animal ID:</strong> {animal.animalId}</li>
        <li><strong>Gender:</strong> {animal.sex}</li>
        <li><strong>Breed:</strong> {animal.breed}</li>
        <li><strong>Weight:</strong> {animal.weight}</li>
        <li><strong>Feed Type:</strong> {animal.feedType}</li>
        <li><strong>Age:</strong> {animal.age} years</li>
        <li><strong>Health Status:</strong> {animal.healthStatus}</li>
        <li><strong>Symptoms:</strong> {animal.symptoms || "None"}</li>
        <li><strong>Medicine Prescribed:</strong> {animal.medicine || "None"}</li>
        <li><strong>Milking Quantity:</strong> {animal.milkingQuantity || 0} liters</li>
        <li><strong>Status:</strong> {animal.status}</li>
        <li><strong>Registered Date:</strong> {new Date(animal.createdAt).toLocaleDateString()}</li>
      </ul>
    </div>
  );
};

export default EachAnimalDetails;
