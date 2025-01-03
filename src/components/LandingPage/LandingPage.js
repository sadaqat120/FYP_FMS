import React from "react";
import visionImage from "../../assets/vision.jpg";
import service1 from "../../assets/service1.jpg";
import service2 from "../../assets/service2.jpg";
import service3 from "../../assets/service3.jpg";
import service4 from "../../assets/service4.jpg";
import service5 from "../../assets/service5.jpg";
import service6 from "../../assets/service6.jpg";
import "./HeroSection.css";
import "./Vision.css";
import "./Services.css";
import "./Footer.css";

const LandingPage = ({ isLoggedIn, navigateToLogin, onReminderServiceClick, onCropManagementClick }) => {
  const handleGetStarted = () => {
    const servicesSection = document.getElementById("services-section");
    servicesSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <section className="hero" id="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Smart Farming, Managed Together!</h1>
          <p className="w-[550px] mx-auto">
            From real-time crop tracking to efficient livestock management and
            resource optimization, revolutionize your farming operations and
            enhance productivity today.
          </p>
          <button className="button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>
      <section className="vision">
        <div className="text">
          <h2>Vision</h2>
          <p>
            To empower small-scale farmers by digitizing agricultural
            operations, enabling efficient farm management, and fostering
            sustainable agricultural practices. Our Farm Management System aims
            to transform traditional farming methods by providing a centralized
            platform for crop planning, livestock tracking, resource management,
            and intelligent decision-making tools like notifications, reminders,
            and reports.
          </p>
        </div>
        <div className="image">
          <img src={visionImage} alt="Vision" />
        </div>
      </section>
      <section className="services" id="services-section">
        <h2>Our Services</h2>
        <div className="service-list">
          <div
            className="service-item"
            onClick={() => {
              if (isLoggedIn) {
                onCropManagementClick();
              } else {
                navigateToLogin();
              }
            }}
          >
            <img src={service1} alt="Crop Management" />
            <h3>Crop Management</h3>
            <p>
              Optimize your crop planning and performance with tools for
              tracking growth, managing resources, and improving yield
              efficiency.
            </p>
          </div>
          <div className="service-item">
            <img src={service2} alt="Livestock Management" />
            <h3>Livestock Management</h3>
            <p>
              Monitor livestock health, feeding schedules, and breeding with
              precision to ensure the productivity and well-being of your
              animals.
            </p>
          </div>
          <div className="service-item">
            <img src={service3} alt="Resource Management" />
            <h3>Resource Management</h3>
            <p>
              Streamline your resource allocation by tracking and managing
              seeds, fertilizers, equipment, and more for optimal usage.
            </p>
          </div>
          <div className="service-item">
            <img src={service4} alt="ChatBot" />
            <h3>ChatBot</h3>
            <p>
              Get real-time answers to your farming queries with an intelligent
              chatbot integrated with your farm's data.
            </p>
          </div>
          <div
            className="service-item"
            onClick={onReminderServiceClick}
          >
            <img src={service5} alt="Reminders Service" />
            <h3>Reminders Service</h3>
            <p>
              Stay on top of your tasks with automated reminders for planting,
              harvesting, feeding, and maintenance activities.
            </p>
          </div>
          <div className="service-item">
            <img src={service6} alt="Report Generation" />
            <h3>Report Generation</h3>
            <p>
              Generate comprehensive reports for crop performance, livestock
              productivity, and resource usage to make informed decisions.
            </p>
          </div>
        </div>
      </section>
      <footer className="footer" id="about-section">
        <h3>About Us</h3>
        <p>
          <strong>Email:</strong> sadaqat2021@namal.edu.pk
        </p>
        <p>
          <strong>Location:</strong> Namal University, Mianwali
        </p>
        <p>
          <strong>Phone:</strong> +9328 0473867
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
