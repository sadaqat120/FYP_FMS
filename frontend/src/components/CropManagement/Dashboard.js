import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ storeId }) => {
  const [land, setLand] = useState(null);
  const [crop, setCrop] = useState(null);
  const [costs, setCosts] = useState([]);
  const [summary, setSummary] = useState(null);
  const [progressStage, setProgressStage] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAll = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/dashboard/${storeId}`,
          {
            headers: { Authorization: token },
          }
        );

        setLand(res.data.land);
        setCrop(res.data.crop);
        setCosts(res.data.costs);
        if (res.data.summary) setSummary(res.data.summary);

        calculateProgress(res.data.crop);
      } catch (error) {
        console.error("Dashboard load error:", error);
      }
    };

    fetchAll();
  }, [storeId]);

  const calculateProgress = (crop) => {
    if (!crop?.seedingDate || !crop?.duration) return;

    const start = new Date(crop.seedingDate);
    const now = new Date();
    const durationDays = parseInt(crop.duration);
    const diffTime = Math.max(0, now - start);
    const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const percent = Math.min((daysPassed / durationDays) * 100, 100);

    let stage = "Not Started";
    if (percent <= 10) stage = "Sprout";
    else if (percent <= 25) stage = "Seedling";
    else if (percent <= 60) stage = "Grow";
    else if (percent <= 85) stage = "Bloom";
    else if (percent < 100) stage = "Mature";
    else stage = "Harvest";

    setProgressPercent(percent);
    setProgressStage(stage);
  };

  const totalCost = costs.reduce((acc, c) => {
    return (
      acc +
      c.equipmentCost +
      c.materialCost +
      c.laborCost +
      c.transportCost +
      c.miscCost
    );
  }, 0);

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-inner space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 space-y-5">
          <h2 className="text-3xl font-bold text-green-700">
            {crop?.cropName || "Crop Farm"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="space-y-1">
              <p>
                <strong>Location:</strong> {land?.location}
              </p>
              <p>
                <strong>Area:</strong> {land?.area} acres
              </p>
              <p>
                <strong>Land Type:</strong> {land?.landType}
              </p>
              <p>
                <strong>Soil Type:</strong> {land?.soilType}
              </p>
              {land?.landSuitability && (
                <p>
                  <strong>Suitability:</strong> {land.landSuitability}
                </p>
              )}
              {land?.notes && (
                <p>
                  <strong>Notes:</strong> {land.notes}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <p>
                <strong>Season:</strong> {crop?.season}
              </p>
              <p>
                <strong>Crop Type:</strong> {crop?.cropType}
              </p>
              <p>
                <strong>Duration:</strong> {(crop?.duration / 30).toFixed(1)}{" "}
                months
              </p>
              <p>
                <strong>Seed Quantity:</strong> {crop?.seedQuantity} kg
              </p>
              <p>
                <strong>Sowing Date:</strong> {crop?.seedingDate}
              </p>
              {crop?.notes && (
                <p>
                  <strong>Notes:</strong> {crop.notes}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center text-sm font-semibold mb-1">
              <span className="text-green-800">
                Growth Stage: {progressStage}
              </span>
              <span>{progressPercent.toFixed(1)}%</span>
            </div>
            <div className="h-4 bg-green-100 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 w-full space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm hover:shadow-md">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Yield Summary
            </h3>
            {summary ? (
              <div className="text-sm space-y-1">
                <p>
                  <strong>Expected:</strong> {summary.expectedYield}{" "}
                  {summary.unit}
                </p>
                <p>
                  <strong>Achieved:</strong> {summary.totalYield} {summary.unit}
                </p>
                <p>
                  <strong>Grade:</strong> {summary.yieldGrade}
                </p>
                <p>
                  <strong>Notes:</strong> {summary.yieldNotes || "—"}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Awaiting harvest data.</p>
            )}
          </div>

          <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg shadow-sm hover:shadow-md">
            <h3 className="font-semibold text-blue-800 mb-2">
              Financial Summary
            </h3>
            {summary ? (
              <div className="text-sm space-y-1">
                <p>
                  <strong>Total Cost:</strong> PKR {summary.totalCost}
                </p>
                <p>
                  <strong>Revenue:</strong> PKR {summary.sellRevenue}
                </p>
                <p>
                  <strong>Net Profit:</strong> PKR {summary.netProfit}
                </p>
                <p>
                  <strong>Notes:</strong> {summary.revenueNotes || "—"}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Awaiting financial data.</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-green-700">
          Cost Overview
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-green-100 text-gray-800">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Activity</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Equipment</th>
                <th className="p-2 border">Material</th>
                <th className="p-2 border">Labor</th>
                <th className="p-2 border">Transport</th>
                <th className="p-2 border">Misc</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Notes</th>
              </tr>
            </thead>
            <tbody>
              {costs.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center p-4 text-gray-500">
                    No cost entries recorded yet.
                  </td>
                </tr>
              ) : (
                costs.map((c, i) => {
                  const total =
                    c.equipmentCost +
                    c.materialCost +
                    c.laborCost +
                    c.transportCost +
                    c.miscCost;
                  return (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="p-2 border text-center">{i + 1}</td>
                      <td className="p-2 border capitalize">{c.activity}</td>
                      <td className="p-2 border">{c.date}</td>
                      <td className="p-2 border">PKR {c.equipmentCost}</td>
                      <td className="p-2 border">PKR {c.materialCost}</td>
                      <td className="p-2 border">PKR {c.laborCost}</td>
                      <td className="p-2 border">PKR {c.transportCost}</td>
                      <td className="p-2 border">PKR {c.miscCost}</td>
                      <td className="p-2 border font-semibold">PKR {total}</td>
                      <td className="p-2 border">{c.notes || "—"}</td>
                    </tr>
                  );
                })
              )}
              {costs.length > 0 && (
                <tr className="bg-green-100 font-semibold text-right">
                  <td colSpan="8" className="p-2">
                    Total Cost:
                  </td>
                  <td className="p-2 text-left">PKR {totalCost}</td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
