import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CropReport = () => {
  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [farmData, setFarmData] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/CropFarm", {
          headers: { Authorization: token },
        });
        setFarms(res.data);
      } catch (err) {
        console.error("Farm fetch failed", err);
      }
    };
    fetchFarms();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedFarmId) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/dashboard/${selectedFarmId}`,
          {
            headers: { Authorization: token },
          }
        );
        setFarmData(res.data);
      } catch (err) {
        console.error("Report fetch error", err);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedFarmId, token]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const cropName = farmData.crop?.cropName || "Crop";

    doc.setFontSize(18);
    doc.text("Farm Management System", 105, 15, { align: "center" });
    doc.setFontSize(14);
    doc.text(`Crop: ${cropName} Record`, 14, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 30);

    let y = 40;

    doc.text("Land Overview", 14, y);
    autoTable(doc, {
      startY: y + 5,
      body: [
        ["Location", farmData.land?.location || "—"],
        ["Area (acres)", farmData.land?.area || "—"],
        ["Land Type", farmData.land?.landType || "—"],
        ["Soil Type", farmData.land?.soilType || "—"],
      ],
    });

    y = doc.lastAutoTable.finalY + 10;
    doc.text("Crop Overview", 14, y);
    autoTable(doc, {
      startY: y + 5,
      body: [
        ["Crop", cropName],
        ["Type", farmData.crop?.cropType || "—"],
        ["Season", farmData.crop?.season || "—"],
        ["Seeding Date", farmData.crop?.seedingDate || "—"],
        ["Duration (days)", farmData.crop?.duration || "—"],
        ["Seed Quantity (kg)", farmData.crop?.seedQuantity || "—"],
        ["Notes", farmData.crop?.notes || "—"],
      ],
    });

    const costBody = farmData.costs?.map((c) => [
      c.activity,
      c.equipmentCost,
      c.materialCost,
      c.laborCost,
      c.transportCost,
      c.miscCost,
      c.date,
    ]);
    const totalCost =
      farmData.costs?.reduce(
        (sum, c) =>
          sum +
          c.equipmentCost +
          c.materialCost +
          c.laborCost +
          c.transportCost +
          c.miscCost,
        0
      ) || 0;

    y = doc.lastAutoTable.finalY + 10;
    doc.text("Cost Overview", 14, y);
    autoTable(doc, {
      startY: y + 5,
      head: [["Activity", "Equip", "Material", "Labor", "Transport", "Misc", "Date"]],
      body: costBody,
      foot: [["", "", "", "", "", "Total", `PKR ${totalCost}`]],
    });

    y = doc.lastAutoTable.finalY + 10;
    doc.text("Final Summary", 14, y);
    autoTable(doc, {
      startY: y + 5,
      body: [
        ["Expected Yield", farmData.summary?.expectedYield || "—"],
        ["Achieved Yield", farmData.summary?.totalYield || "—"],
        ["Unit", farmData.summary?.unit || "—"],
        ["Grade", farmData.summary?.yieldGrade || "—"],
        ["Total Cost", farmData.summary?.totalCost || "—"],
        ["Revenue", farmData.summary?.sellRevenue || "—"],
        ["Net Profit", farmData.summary?.netProfit || "—"],
        ["Satisfaction", `${farmData.summary?.satisfaction || 0} / 5`],
        ["Notes", farmData.summary?.yieldNotes || "—"],
      ],
    });

    doc.save(`${cropName}-report.pdf`);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-emerald-800">
        Crop Management Report
      </h1>

      <div className="max-w-xl mx-auto">
        <select
          onChange={(e) => setSelectedFarmId(e.target.value)}
          value={selectedFarmId}
          className="w-full border p-3 rounded-lg shadow-sm"
        >
          <option value="">Select a Crop Farm</option>
          {farms.map((farm) => (
            <option key={farm._id} value={farm._id}>
              {farm.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center text-gray-500">Loading farm data...</p>}

      {farmData && (
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
            {farmData.crop?.cropName || "Crop"} Record Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-emerald-600 mb-2">Land Info</h3>
              <p><strong>Location:</strong> {farmData.land?.location || "—"}</p>
              <p><strong>Area:</strong> {farmData.land?.area} acres</p>
              <p><strong>Type:</strong> {farmData.land?.landType}</p>
              <p><strong>Soil:</strong> {farmData.land?.soilType}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-emerald-600 mb-2">Crop Info</h3>
              <p><strong>Crop:</strong> {farmData.crop?.cropName}</p>
              <p><strong>Season:</strong> {farmData.crop?.season}</p>
              <p><strong>Type:</strong> {farmData.crop?.cropType}</p>
              <p><strong>Seeding Date:</strong> {farmData.crop?.seedingDate}</p>
              <p><strong>Duration:</strong> {farmData.crop?.duration} days</p>
              <p><strong>Seed Quantity:</strong> {farmData.crop?.seedQuantity} kg</p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={generatePDF}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md shadow-md transition"
            >
              Download PDF Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropReport;
