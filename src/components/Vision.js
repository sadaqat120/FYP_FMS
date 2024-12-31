import React from "react";
import visionImage from "../assets/vision.jpg";

const Vision = () => {
  return (
    <section className="vision">
      <div className="text">
        <h2>Vision</h2>
        <p>
          To empower small-scale farmers by digitizing agricultural operations,
          enabling efficient farm management, and fostering sustainable
          agricultural practices. Our Farm Management System aims to transform
          traditional farming methods by providing a centralized platform for
          crop planning, livestock tracking, resource management, and
          intelligent decision-making tools like notifications, reminders, and
          reports.
        </p>
      </div>
      <div className="image">
        <img src={visionImage} alt="Vision" />
      </div>
    </section>
  );
};

export default Vision;
