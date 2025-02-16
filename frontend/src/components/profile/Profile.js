import React, { useState } from "react";
import "./Profile.css";
import ChangeProfile from "./ChangeProfile";
import Notifications from "./Notifications";
import Languages from "./Languages";
import ChangePassword from "./ChangePassword";
import LogoutPrompt from "./LogoutPrompt";
import Location from "./Location";
import profile_picture from "../../assets/sadaqat.jpg";

const Profile = ({ onClose, userDetails }) => {
  const [activeTab, setActiveTab] = useState("");

  // Extract firstName, lastName, and email from userDetails prop
  const { firstName, lastName, email } = userDetails || {};

  const renderContent = () => {
    switch (activeTab) {
      case "changeProfile":
        return <ChangeProfile />;
      case "notifications":
        return <Notifications />;
      case "languages":
        return <Languages />;
      case "changePassword":
        return <ChangePassword />;
      case "location":
        return <Location />;
      case "logout":
        return <LogoutPrompt onClose={onClose} />;
      default:
        return (
          <div className="empty-section">
            <p>Select an option to view details here.</p>
          </div>
        );
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-left">
        <img src={profile_picture} alt="Profile" className="profile-picture" />

        {/* Display user's actual name and email */}
        <h3>{firstName} {lastName}</h3>
        <p>{email}</p>

        <ul className="profile-menu">
          <li onClick={() => setActiveTab("changeProfile")}>Change Profile</li>
          <li onClick={() => setActiveTab("notifications")}>Notifications</li>
          <li onClick={() => setActiveTab("changePassword")}>Change Password</li>
          <li onClick={() => setActiveTab("location")}>Location</li>
          <li onClick={() => setActiveTab("logout")}>Logout</li>
        </ul>
      </div>
      <div className="profile-right">{renderContent()}</div>
    </div>
  );
};

export default Profile;
