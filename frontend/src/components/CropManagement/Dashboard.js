import React from "react";

const Dashboard = () => {
  return (
    <div className="p-5 border-4 border-black rounded-2xl space-y-5">
      {/* Row: Plot Box + Yield + Financial (right stacked) */}
      <div className="flex flex-wrap lg:flex-nowrap gap-5">
        {/* Left: Plot Box, full height */}
        <div className="lg:w-1/2 w-full p-5 border border-gray-300 rounded-lg bg-green-100 shadow-md">
          <h3 className="text-2xl text-teal-900 mb-2">Namal Plot</h3>
          <p><strong>Location:</strong> Namal, Mianwali</p>
          <p><strong>Total Area:</strong> 10 acres</p>
          <p><strong>Land Type:</strong> Irrigated</p>
          <p><strong>Crop Name:</strong> Wheat</p>
          <p><strong>Seed Quantity:</strong> 10 kg</p>
          <p><strong>Sowing Date:</strong> 10th January 2025</p>
          <div className="mt-4">
            <p><strong>Crop Stage:</strong> Growing</p>
            <div className="bg-gray-300 h-2 rounded mt-1 overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: "60%" }}></div>
            </div>
          </div>
        </div>

        {/* Right: Yield + Financial stacked */}
        <div className="lg:w-1/2 w-full flex flex-col gap-5">
          <div className="p-5 border border-gray-300 rounded-lg bg-lime-50">
            <h3 className="text-lg font-semibold mb-2">Yield Breakdown</h3>
            <p><strong>Expected Yield:</strong> 45 kg</p>
            <p><strong>Total Achieved Yield:</strong> 40 kg</p>
            <p><strong>Yield Grade:</strong> Good</p>
            <p><strong>Notes:</strong> Satisfactory yield so far.</p>
          </div>
          <div className="p-5 border border-gray-300 rounded-lg bg-lime-50">
            <h3 className="text-lg font-semibold mb-2">Financial Outcome</h3>
            <p><strong>Total Cost:</strong> PKR 5000</p>
            <p><strong>Sell Revenue:</strong> PKR 7000</p>
            <p><strong>Net Profit:</strong> PKR 2000</p>
            <p><strong>Notes:</strong> Profit achieved as expected.</p>
          </div>
        </div>
      </div>

      {/* Cost Overview */}
      <div className="w-full p-5 border border-gray-300 rounded-lg bg-lime-100">
        <h3 className="mb-2 text-xl font-semibold">Cost Overview</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-green-200 text-green-800">ID</th>
              <th className="border border-gray-300 p-2 bg-green-200 text-green-800">Type of Work</th>
              <th className="border border-gray-300 p-2 bg-green-200 text-green-800">Date</th>
              <th className="border border-gray-300 p-2 bg-green-200 text-green-800">Cost (PKR)</th>
              <th className="border border-gray-300 p-2 bg-green-200 text-green-800">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">Irrigation</td>
              <td className="border border-gray-300 p-2">12th Jan 2025</td>
              <td className="border border-gray-300 p-2">2000</td>
              <td className="border border-gray-300 p-2">Irrigation for the main plot.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">2</td>
              <td className="border border-gray-300 p-2">Fertilization</td>
              <td className="border border-gray-300 p-2">15th Jan 2025</td>
              <td className="border border-gray-300 p-2">3000</td>
              <td className="border border-gray-300 p-2">Applied urea fertilizer.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Satisfaction */}
      <div className="p-4 border border-gray-300 rounded-lg bg-lime-100 text-center">
        <h3 className="text-xl text-green-900 mb-2">Your Satisfaction:</h3>
        <div className="text-2xl text-yellow-500">⭐⭐⭐⭐☆</div>
      </div>
    </div>
  );
};

export default Dashboard;
