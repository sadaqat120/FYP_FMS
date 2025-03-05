import React, { useState } from "react";
import axios from "axios";

const AnimalRegistrationForm = ({ farmId, sex, setSex }) => {
  const [animalId, setAnimalId] = useState("");
  const [animalCategory, setAnimalCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [medicine, setMedicine] = useState("");
  const [feedType, setFeedType] = useState("");
  const [milkingQuantity, setMilkingQuantity] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    // Reset errors
    setErrors({});

    // Validate required fields
    const newErrors = {};
    if (!animalId) newErrors.animalId = "Animal ID is required.";
    if (!animalCategory) newErrors.animalCategory = "Animal category is required.";
    if (animalCategory === "Others" && !otherCategory) newErrors.otherCategory = "Please specify the other category.";
    if (!sex) newErrors.sex = "Sex is required.";
    if (!weight) newErrors.weight = "Weight is required.";
    if (!breed) newErrors.breed = "Breed is required.";
    if (!age) newErrors.age = "Age is required.";
    if (!healthStatus) newErrors.healthStatus = "Health status is required.";
    if (!feedType) newErrors.feedType = "Feed type is required.";
    if (!status) newErrors.status = "Animal status is required.";
    if (sex === "female" && !milkingQuantity) newErrors.milkingQuantity = "Milking quantity is required for females.";

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Format animal category
    const formattedCategory = animalCategory === "Others" ? capitalizeFirstLetter(otherCategory) : capitalizeFirstLetter(animalCategory);

    // Prepare data to save
    const animalData = {
      farmId, // Include the farm ID
      animalId,
      category: formattedCategory,
      sex,
      weight,
      breed,
      age,
      healthStatus,
      symptoms,
      medicine,
      feedType,
      milkingQuantity: sex === "male" ? null : milkingQuantity, // Set to null if male
      status,
    };

    try {
      // Save data to the backend
      const response = await axios.post("http://localhost:5000/animals", animalData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("Animal data saved:", response);
      alert("Data Saved Successfully!");
    } catch (error) {
      console.error("Error saving animal data:", error);
      if (error.response && error.response.status === 400) {
        setErrors({ animalId: error.response.data.message }); // Use the message from the backend
      } else {
        setErrors({ general: "An unexpected error occurred. Please try again." });
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="mt-4 border p-4 rounded-lg">
      <h3 className="text-lg font-bold text-green-600">Animal Registration</h3>
      <form className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Animal ID"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          {errors.animalId && <p className="text-red-500 text-sm">{errors.animalId}</p>}
        </div>

        <div>
          <select
            className="w-full border rounded-lg p-2"
            value={animalCategory}
            onChange={(e) => setAnimalCategory(e.target.value)}
            required
          >
            <option value="">Select Animal Category</option>
            <option value="cow">Cow</option>
            <option value="buffalo">Buffalo</option>
            <option value="camel">Camel</option>
            <option value="sheep">Sheep</option>
            <option value="goat">Goat</option>
            <option value="Others">Others</option>
          </select>
          {errors.animalCategory && <p className="text-red-500 text-sm">{errors.animalCategory}</p>}
        </div>

        {animalCategory === "Others" && (
          <div>
            <input
              type="text"
              placeholder="Specify Other Category"
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
            {errors.otherCategory && <p className="text-red-500 text-sm">{errors.otherCategory}</p>}
          </div>
        )}

        <div>
          <select
            className="w-full border rounded-lg p-2"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          >
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          {errors.breed && <p className="text-red-500 text-sm">{errors.breed}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Age (years)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

        <div>
          <select
            className="w-full border rounded-lg p-2"
            value={healthStatus}
            onChange={(e) => setHealthStatus(e.target.value)}
            required
          >
            <option value="">Select Health Status</option>
            <option value="healthy">Healthy</option>
            <option value="sick">Sick</option>
            <option value="recovering">Recovering</option>
          </select>
          {errors.healthStatus && <p className="text-red-500 text-sm">{errors.healthStatus}</p>}
        </div>

        <div>
          <textarea
            placeholder="Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows="2"
          ></textarea>
        </div>

        <div>
          <textarea
            placeholder="Medicine Prescribed"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows="2"
          ></textarea>
        </div>

        <div>
          <select
            className="w-full border rounded-lg p-2"
            value={feedType}
            onChange={(e) => setFeedType(e.target.value)}
            required
          >
            <option value="">Select Feed Type</option>
            <option value="hay">Hay</option>
            <option value="grain">Grain</option>
            <option value="silage">Silage</option>
            <option value="Others">Others</option>
          </select>
          {errors.feedType && <p className="text-red-500 text-sm">{errors.feedType}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Milking Quantity (liters)"
            value={milkingQuantity}
            onChange={(e) => setMilkingQuantity(e.target.value)}
            className="w-full border rounded-lg p-2"
            disabled={sex === "male"}
            required={sex === "female"}
          />
          {errors.milkingQuantity && <p className="text-red-500 text-sm">{errors.milkingQuantity}</p>}
        </div>

        <div>
          <select
            className="w-full border rounded-lg p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Animal Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="sold">Sold</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Save
        </button>
        {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
      </form>
    </div>
  );
};

export default AnimalRegistrationForm;
