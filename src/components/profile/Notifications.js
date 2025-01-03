import React from "react";
import "./Notifications.css";

const Notifications = () => {
  const notifications = [
    "Crop Management: Irrigation scheduled for Wheat Field.",
    "Resource Management: Seeds low in stock (5kg remaining).",
    "Livestock Management: Vaccination due for Dairy Cows.",
  ];

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            <span className="notification-icon">🔔</span>
            <p>{notification}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
