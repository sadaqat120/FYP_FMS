import React from "react";
import HeroSectionImage from "../../assets/main_page.jpeg"
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

const LandingPage = ({
  isLoggedIn,
  navigateToLogin,
  onReminderServiceClick,
  onCropManagementClick,
  onLivestockManagementClick,
  onResourceManagementClick,
  onChatBotClick,
  onReportGenerationClick
}) => {
  const handleGetStarted = () => {
    const servicesSection = document.getElementById("services-section");
    servicesSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <section className="hero" id="hero-section" style={
        {
          backgroundImage: `url(${HeroSectionImage})`
        }
      }>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Smart Farming, Managed Together!</h1>
          <p className="w-[550px] mx-auto">
          From crop tracking and livestock management to basic resource planning — manage your farming operations and improve productivity with simple digital tools.
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
            and intelligent decision-making tools like Chatbot, reminders,
            and Record Summary.
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
            Record and monitor your crop fields, activities, and costs. Track sowing, fertilization, and harvest, with summaries of yield and profit for each plot.
            </p>
          </div>
          <div
            className="service-item"
            onClick={() => {
              if (isLoggedIn) {
                onLivestockManagementClick();
              } else {
                navigateToLogin();
              }
            }}
          >
            <img src={service2} alt="Livestock Management" />
            <h3>Livestock Management</h3>
            <p>
            Track health, feeding, and breeding of your animals with precision. Keep your records organized and your livestock cared for.
            </p>
          </div>
          <div
            className="service-item"
            onClick={() => {
              if (isLoggedIn) {
                onResourceManagementClick();
              } else {
                navigateToLogin();
              }
            }}
          >
            <img src={service3} alt="Resource Management" />
            <h3>Resource Management</h3>
            <p>
              Streamline your resource allocation by tracking and managing
              seeds, fertilizers, equipment, and more for optimal usage and ensure timely availability.
            </p>
          </div>
          <div
            className="service-item"
            onClick={() => {
              if (isLoggedIn) {
                onChatBotClick();
              } else {
                navigateToLogin();
              }
            }}
          >
            <img src={service4} alt="ChatBot" />
            <h3>ChatBot</h3>
            <p>
              Get real-time answers to your farming queries with an intelligent
              chatbot integrated with your farm's data.
            </p>
          </div>
          <div className="service-item" onClick={onReminderServiceClick}>
            <img src={service5} alt="Reminders Service" />
            <h3>Reminders Service</h3>
            <p>
            Create custom reminders for planting, feeding, irrigation, and more. Stay on top of tasks with manual alerts you set yourself.
            </p>
          </div>
          <div
            className="service-item"
            onClick={() => {
              if (isLoggedIn) {
                onReportGenerationClick();
              } else {
                navigateToLogin();
              }
            }}
          >
            <img src={service6} alt="Report Generation" />
            <h3>Interactive Record Builder</h3>
            <p>
            Generate and download summaries of crop and resource records. Includes yield, costs, and profit details saved to your device.
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
