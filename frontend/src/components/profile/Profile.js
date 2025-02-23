// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import ChangeProfile from "./ChangeProfile";
import Notifications from "./Notifications";
import Languages from "./Languages";
import ChangePassword from "./ChangePassword";
import LogoutPrompt from "./LogoutPrompt";
import Location from "./Location";

const Profile = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("");
  const [userDetails, setUserDetails] = useState({}); // Store user details
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/auth/user", {
            headers: {
              Authorization: token,
            },
          });
          setUserDetails(response.data);
          if (response.data.profilePicture) {
            setProfilePicture(`http://localhost:5000/uploads/profilePictures/${response.data.profilePicture}`);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/profilePictureUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": token,
        },
      });

      if (response.data.imagePath) {
        const imageUrl = `http://localhost:5000/uploads/profilePictures/${response.data.imagePath}`;
        setProfilePicture(imageUrl);

        // Update user details with the new profile picture
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          profilePicture: response.data.imagePath,
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

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
        <div className="profile-picture-wrapper">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="profile-picture" />
          ) : (
            <div className="profile-placeholder">
              {userDetails.firstName?.[0]}{userDetails.lastName?.[0]}
            </div>
          )}

          <label htmlFor="file-upload" className="upload-icon">
            <span style={{ fontSize: "26px" }}>📷</span>
            <span>Add photo</span>
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>

        <h3>{userDetails.firstName} {userDetails.lastName}</h3>
        <p>{userDetails.email}</p>

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
