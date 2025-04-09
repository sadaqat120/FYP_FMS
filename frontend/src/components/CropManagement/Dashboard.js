import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="plot-box">
          <h3>Namal Plot</h3>
          <p><strong>Location:</strong> Namal, Mianwali</p>
          <p><strong>Total Area:</strong> 10 acres</p>
          <p><strong>Land Type:</strong> Irrigated</p>
          <p><strong>Crop Name:</strong> Wheat</p>
          <p><strong>Seed Quantity:</strong> 10 kg</p>
          <p><strong>Sowing Date:</strong> 10th January 2025</p>
          <div className="progress-section">
            <p><strong>Crop Stage:</strong> Growing</p>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: "60%" }}></div>
            </div>
          </div>
        </div>

        <div className="cost-overview">
          <h3>Cost Overview</h3>
          <table className="cost-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type of Work</th>
                <th>Date</th>
                <th>Cost (PKR)</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Irrigation</td>
                <td>12th Jan 2025</td>
                <td>2000</td>
                <td>Irrigation for the main plot.</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Fertilization</td>
                <td>15th Jan 2025</td>
                <td>3000</td>
                <td>Applied urea fertilizer.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div className="notifications">
          <h3>Upcoming Notifications</h3>
          <ul>
            <li>Irrigation needed on 25th Jan 2025</li>
            <li>Fertilization due on 30th Jan 2025</li>
          </ul>
        </div> */}
      </div>

      <div className="summary">
        <div className="yield-summary">
          <h3>Yield Breakdown</h3>
          <p><strong>Expected Yield:</strong> 45 kg</p>
          <p><strong>Total Achieved Yield:</strong> 40 kg</p>
          <p><strong>Yield Grade:</strong> Good</p>
          <p><strong>Notes:</strong> Satisfactory yield so far.</p>
        </div>
        <div className="financial-outcome">
          <h3>Financial Outcome</h3>
          <p><strong>Total Cost:</strong> PKR 5000</p>
          <p><strong>Sell Revenue:</strong> PKR 7000</p>
          <p><strong>Net Profit:</strong> PKR 2000</p>
          <p><strong>Notes:</strong> Profit achieved as expected.</p>
        </div>
      </div>

      <div className="satisfaction">
        <h3>Your Satisfaction:</h3>
        <div className="rating">
          <span>⭐⭐⭐⭐☆</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
