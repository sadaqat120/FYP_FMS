import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimalCategoryDetails from "./AnimalCategoryDetails";

const Dashboard = ({ activeFarmId }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [farmData, setFarmData] = useState({});
  const [costOverview, setCostOverview] = useState([]);
  const [productionOverview, setProductionOverview] = useState([]); // New state
  const [totalCost, setTotalCost] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [milkProduction, setMilkProduction] = useState(0);
  const [milkSellingRevenue, setMilkSellingRevenue] = useState(0);
  const [soldAnimals, setSoldAnimals] = useState(0);
  const [otherRevenue, setOtherRevenue] = useState(0);
  const [sellingAnimalRevenue, setSellingAnimalRevenue] = useState(0);
  const [feedTypes, setFeedTypes] = useState([]);
  const [animalCategories, setAnimalCategories] = useState([]);

  useEffect(() => {
    const fetchFarmData = async () => {
      if (!activeFarmId) {
        console.error("Farm ID is undefined");
        return;
      }

      try {
        const token = localStorage.getItem("token");

        // Farm data
        const farmResponse = await axios.get(
          `http://localhost:5000/farms/${activeFarmId}`,
          { headers: { Authorization: token } }
        );
        setFarmData(farmResponse.data);

        // Expenses
        const expensesResponse = await axios.get(
          `http://localhost:5000/expenses/farm/${activeFarmId}`,
          { headers: { Authorization: token } }
        );
        setCostOverview(expensesResponse.data);
        const totalCost = expensesResponse.data.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        setTotalCost(totalCost);

        // Productions
        const productionsResponse = await axios.get(
          `http://localhost:5000/productions/farm/${activeFarmId}`,
          { headers: { Authorization: token } }
        );
        setProductionOverview(productionsResponse.data); // Set production data

        let milkProduction = 0;
        let milkSellingRevenue = 0;
        let soldAnimals = 0;
        let otherRevenue = 0;
        let sellingAnimalRevenue = 0;

        productionsResponse.data.forEach((prod) => {
          if (prod.productionType === "milkProduction") {
            milkProduction += prod.milkQuantity || 0;
          }
          if (prod.productionType === "milkSelling") {
            milkSellingRevenue += prod.milkRevenue || 0;
          }
          if (prod.productionType === "sellingAnimal") {
            soldAnimals += prod.soldAnimals || 0;
            sellingAnimalRevenue += prod.sellingRevenue || 0;
          }
          if (prod.productionType === "otherRevenue") {
            otherRevenue += prod.revenueIncome || 0;
          }
        });

        setMilkProduction(milkProduction);
        setMilkSellingRevenue(milkSellingRevenue);
        setSoldAnimals(soldAnimals);
        setSellingAnimalRevenue(sellingAnimalRevenue);
        setOtherRevenue(otherRevenue);
        setTotalRevenue(
          sellingAnimalRevenue + milkSellingRevenue + otherRevenue
        );

        // Animals
        const animalsResponse = await axios.get(
          `http://localhost:5000/animals/farm/${activeFarmId}`,
          { headers: { Authorization: token } }
        );
        const animals = animalsResponse.data;
        const uniqueFeedTypes = new Set(
          animals.map((animal) => animal.feedType)
        );
        const uniqueCategories = new Set(
          animals.map((animal) => animal.category)
        );
        setFeedTypes(Array.from(uniqueFeedTypes));
        setAnimalCategories(Array.from(uniqueCategories));
        setFarmData((prev) => ({ ...prev, livestockCount: animals.length }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFarmData();
  }, [activeFarmId]);

  return (
    <div className="p-6 bg-gray-100">
      {/* Overview */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-bold text-green-600">
          Farm Location: {farmData.location || "None"}
        </h3>
        <h3 className="text-2xl font-bold text-green-600">
          {farmData.livestockCount
            ? `${farmData.livestockCount} livestock recorded`
            : "No livestock records available."}
        </h3>
      </div>

      {/* Summary Overview */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-green-600 mb-4">Overview</h3>
        <div className="flex justify-between">
          <ul className="list-disc ml-6">
            <li>Milk Production: {milkProduction} Liters</li>
            <li>Milk Selling Revenue: {milkSellingRevenue} PKR</li>
            <li>Sold Animals: {soldAnimals}</li>
            <li>Selling Animal Revenue: {sellingAnimalRevenue} PKR</li>
            <li>Other Revenue: {otherRevenue} PKR</li>
            <li>Feed of Livestock: {feedTypes.join(", ") || "None"}</li>
          </ul>
          <div>
            <h3 className="text-xl font-bold text-red-600">
              Total Cost: {totalCost} PKR
            </h3>
            <h3 className="text-xl font-bold text-green-600">
              Total Revenue: {totalRevenue} PKR
            </h3>
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
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Cost</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {costOverview.map((cost, index) => (
                <tr key={cost._id} className="odd:bg-white even:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{cost.expenseType}</td>
                  <td className="border px-4 py-2">{cost.amount} PKR</td>
                  <td className="border px-4 py-2">
                    {new Date(cost.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{cost.notes || "None"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No costs recorded yet.</p>
        )}
      </div>

      {/* Production Overview Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold text-green-600 mb-4">
          Production Overview
        </h3>
        {productionOverview.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-green-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Revenue</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {productionOverview.map((prod, index) => {
                const quantity = prod.milkQuantity || prod.soldAnimals || "—";
                const revenue =
                  prod.milkRevenue ||
                  prod.sellingRevenue ||
                  prod.revenueIncome ||
                  "—";

                return (
                  <tr key={prod._id} className="odd:bg-white even:bg-gray-100">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2 capitalize">
                      {prod.productionType}
                    </td>
                    <td className="border px-4 py-2">{quantity}</td>
                    <td className="border px-4 py-2">{revenue} PKR</td>
                    <td className="border px-4 py-2">
                      {new Date(prod.date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{prod.notes || "None"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No production records available.</p>
        )}
      </div>

      {/* Livestock Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-green-600 mb-4">
          Livestock Details
        </h3>
        {animalCategories.length > 0 ? (
          animalCategories.map((category) => (
            <div key={category} className="mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{category}</span>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category ? "" : category
                    )
                  }
                >
                  {selectedCategory === category
                    ? "Hide Details"
                    : "Show Details"}
                </button>
              </div>
              {selectedCategory === category && (
                <AnimalCategoryDetails
                  category={category}
                  farmId={activeFarmId}
                />
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
