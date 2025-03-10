import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimalCategoryDetails from "./AnimalCategoryDetails";

const Dashboard = ({ activeFarmId }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [farmData, setFarmData] = useState({});
  const [costOverview, setCostOverview] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [milkProduction, setMilkProduction] = useState(0);
  const [milkSellingRevenue, setMilkSellingRevenue] = useState(0);
  const [soldAnimals, setSoldAnimals] = useState(0);
  const [otherRevenue, setOtherRevenue] = useState(0); // State for other revenue
  const [sellingAnimalRevenue, setSellingAnimalRevenue] = useState(0); // State for selling animal revenue
  const [feedTypes, setFeedTypes] = useState([]);
  const [animalCategories, setAnimalCategories] = useState([]); // State for animal categories
  const [notifications] = useState([
    "Vaccination due for cows on 01-05-2025",
    "Goat feed stock running low, replenish by 01-07-2025",
    "Health checkup scheduled for 03-05-2025",
  ]);

  useEffect(() => {
    const fetchFarmData = async () => {
      if (!activeFarmId) {
        console.error("Farm ID is undefined");
        return;
      }

      try {
        // Fetch farm data
        const farmResponse = await axios.get(`http://localhost:5000/farms/${activeFarmId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setFarmData(farmResponse.data);

        // Fetch expenses
        const expensesResponse = await axios.get(`http://localhost:5000/expenses/farm/${activeFarmId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setCostOverview(expensesResponse.data);
        const totalCost = expensesResponse.data.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalCost(totalCost);

        // Fetch productions
        const productionsResponse = await axios.get(`http://localhost:5000/productions/farm/${activeFarmId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        
        let milkProduction = 0;
        let milkSellingRevenue = 0;
        let soldAnimals = 0;
        let otherRevenue = 0; // Initialize other revenue
        let sellingAnimalRevenue = 0; // Initialize selling animal revenue

        productionsResponse.data.forEach((prod) => {
          if (prod.productionType === "milkProduction") {
            milkProduction += prod.milkQuantity || 0;
          }
          if (prod.productionType === "milkSelling") {
            milkSellingRevenue += prod.milkRevenue || 0;
          }
          if (prod.productionType === "sellingAnimal") {
            soldAnimals += prod.soldAnimals || 0;
            sellingAnimalRevenue += prod.sellingRevenue || 0; // Collect selling revenue
          }
          if (prod.productionType === "otherRevenue") {
            otherRevenue += prod.revenueIncome || 0; // Collect other revenue
          }
        });

        setMilkProduction(milkProduction);
        setMilkSellingRevenue(milkSellingRevenue);
        setSoldAnimals(soldAnimals);
        setSellingAnimalRevenue(sellingAnimalRevenue); // Set selling animal revenue state
        setOtherRevenue(otherRevenue); // Set other revenue state
        setTotalRevenue(sellingAnimalRevenue + milkSellingRevenue + otherRevenue); // Total revenue calculation

        // Fetch animals
        const animalsResponse = await axios.get(`http://localhost:5000/animals/farm/${activeFarmId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        const uniqueFeedTypes = new Set(animalsResponse.data.map(animal => animal.feedType));
        setFeedTypes(Array.from(uniqueFeedTypes));

        // Collect unique animal categories
        const uniqueCategories = new Set(animalsResponse.data.map(animal => animal.category));
        setAnimalCategories(Array.from(uniqueCategories));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFarmData();
  }, [activeFarmId]);

  return (
    <div className="p-6 bg-gray-100">
      {/* Overview Section */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg mb-6">
        <div>
          <h3 className="text-2xl font-bold text-green-600">Farm Location: {farmData.location || "None"}</h3>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-green-600">Total Animals: {farmData.totalLivestockCount || 0}</h3>
        </div>
      </div>

      {/* Date-to-Date Overview */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-green-600 mb-4">Overview</h3>
        <div className="flex justify-between">
          <ul className="list-disc ml-6">
            <li>Milk Production: {milkProduction} Liters</li>
            <li>Milk Selling Revenue: {milkSellingRevenue} PKR</li>
            <li>Sold Animals: {soldAnimals}</li>
            <li>Selling Animal Revenue: {sellingAnimalRevenue} PKR</li> {/* Selling animal revenue displayed separately */}
            <li>Other Revenue: {otherRevenue} PKR</li> {/* Added other revenue */}
            <li>Feed of Livestock: {feedTypes.join(", ") || "None"}</li>
          </ul>
          <div>
            <h3 className="text-xl font-bold text-red-600">Total Cost: {totalCost} PKR</h3>
            <h3 className="text-xl font-bold text-green-600">Total Revenue: {totalRevenue} PKR</h3> {/* Total revenue calculation */}
          </div>
        </div>
      </div>

      {/* Cost Overview Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-green-600 mb-4">Cost Overview</h3>
        {costOverview.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Cost</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {costOverview.map((cost, index) => (
                <tr key={cost._id} className="odd:bg-white even:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{cost.expenseType}</td>
                  <td className="border border-gray-300 px-4 py-2">{cost.amount} PKR</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(cost.date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{cost.notes || "None"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No costs recorded yet.</p>
        )}
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-green-600 mb-4">Upcoming Notifications (7 Days)</h3>
        <ul className="list-disc ml-6">
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>

      {/* Livestock Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-green-600 mb-4">Livestock Details</h3>
        {animalCategories.length > 0 ? (
          animalCategories.map((category) => (
            <div key={category} className="mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{category}</span>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
                >
                  {selectedCategory === category ? "Hide Details" : "Show Details"}
                </button>
              </div>
              {selectedCategory === category && (
                <AnimalCategoryDetails category={category} total={farmData.totalLivestockCount} />
              )}
            </div>
          ))
        ) : (
          <p>There are no livestock registered.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
