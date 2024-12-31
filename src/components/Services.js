import React from "react";
import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import service4 from "../assets/service4.jpg";
import service5 from "../assets/service5.jpg";
import service6 from "../assets/service6.jpg";

const Services = () => {
  return (
    <section className="services">
      <h2>How We Can Help You</h2>
      <div className="service-list">
        <div className="service-item">
          <img src={service1} alt="Crop Management" />
          <p>
            Optimize your crop planning and performance with tools for tracking
            growth, managing resources, and improving yield efficiency.
          </p>
        </div>
        <div className="service-item">
          <img src={service2} alt="Livestock Management" />
          <p>
            Monitor livestock health, feeding schedules, and breeding with
            precision to ensure the productivity and well-being of your animals.
          </p>
        </div>
        <div className="service-item">
          <img src={service3} alt="Resource Management" />
          <p>
            Streamline your resource allocation by tracking and managing seeds,
            fertilizers, equipment, and more for optimal usage.
          </p>
        </div>
        <div className="service-item">
          <img src={service4} alt="ChatBot" />
          <p>
            Get real-time answers to your farming queries with an intelligent
            chatbot integrated with your farm's data.
          </p>
        </div>
        <div className="service-item">
          <img src={service5} alt="Reminders Service" />
          <p>
            Stay on top of your tasks with automated reminders for planting,
            harvesting, feeding, and maintenance activities.
          </p>
        </div>
        <div className="service-item">
          <img src={service6} alt="Report Generation" />
          <p>
            Generate comprehensive reports for crop performance, livestock
            productivity, and resource usage to make informed decisions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
