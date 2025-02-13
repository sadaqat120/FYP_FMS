import React, { useState } from "react";
import CropForm from "./CropForm";
import LivestockForm from "./LivestockForm";
import ResourceForm from "./ResourceForm";
import "./ServiceReminders.css";

const ServiceReminders = ({ goBack }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const renderForm = () => {
    switch (selectedOption) {
      case "crop":
        return <CropForm goBack={() => setSelectedOption("")} />;
      case "livestock":
        return <LivestockForm goBack={() => setSelectedOption("")} />;
      case "resource":
        return <ResourceForm goBack={() => setSelectedOption("")} />;
      default:
        return null;
    }
  };

  // const handleBackToServices = () => {
  //   const servicesSection = document.getElementById("services-section");
  //   if (servicesSection) {
  //     servicesSection.scrollIntoView({ behavior: "smooth" });
  //   }
  //   else{
  //     alert("Button needs to fix!")
  //   }
  // };

  return (
    <div className="service-reminders">
      {selectedOption ? (
        renderForm()
      ) : (
        <div className="reminders-options">
          <h2>Select a Management Type:</h2>
          <div className="options">
            <button onClick={() => setSelectedOption("crop")} className="button">
              Crop Management
            </button>
            <button
              onClick={() => setSelectedOption("livestock")}
              className="button"
            >
              Livestock Management
            </button>
            <button
              onClick={() => setSelectedOption("resource")}
              className="button"
            >
              Resource Management
            </button>
          </div>
          {/* <button
            onClick={handleBackToServices}
            className="button-secondary"
          >
            Back
          </button> */}
        </div>
      )}
    </div>
  );
};

export default ServiceReminders;
