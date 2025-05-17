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
      if (!selectedFarmId) {
        setFarmData(null);
        return;
      }
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
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <label className="block mb-2 font-semibold text-gray-700">
          Select a Crop Farm
        </label>
        <select
          onChange={(e) => setSelectedFarmId(e.target.value)}
          value={selectedFarmId}
          className="w-full border rounded p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">-- Select Crop Farm --</option>
          {farms.map((farm) => (
            <option key={farm._id} value={farm._id}>
              {farm.name}
            </option>
          ))}
        </select>

        {loading && <p className="text-center text-gray-500">Loading farm data...</p>}

        {farmData && (
          <div className="space-y-4">
            <div className="bg-emerald-50 p-4 rounded shadow">
              <h2 className="text-lg font-bold text-emerald-800 mb-2">
                Crop Summary: {farmData.crop?.cropName}
              </h2>
              <p><strong>Location:</strong> {farmData.land?.location || "—"}</p>
              <p><strong>Area:</strong> {farmData.land?.area || "—"} acres</p>
              <p><strong>Land Type:</strong> {farmData.land?.landType || "—"}</p>
              <p><strong>Soil Type:</strong> {farmData.land?.soilType || "—"}</p>
              <p><strong>Season:</strong> {farmData.crop?.season}</p>
              <p><strong>Type:</strong> {farmData.crop?.cropType}</p>
              <p><strong>Seeding Date:</strong> {farmData.crop?.seedingDate}</p>
              <p><strong>Duration:</strong> {farmData.crop?.duration} days</p>
              <p><strong>Seed Quantity:</strong> {farmData.crop?.seedQuantity} kg</p>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={generatePDF}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropReport;
