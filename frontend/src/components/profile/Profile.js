import React, { useState, useEffect } from "react";
import axios from "axios";
import ChangeProfile from "./ChangeProfile";
import ChangePassword from "./ChangePassword";
import LogoutPrompt from "./LogoutPrompt";
import Location from "./Location";
import bgImage from "../../assets/FMS-Profile-background-picture.jpg";

const Profile = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/auth/user", {
            headers: { Authorization: token },
          });
          setUserDetails(response.data);
          if (response.data.profilePicture) {
            setProfilePicture(
              `http://localhost:5000/uploads/profilePictures/${response.data.profilePicture}`
            );
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
      const response = await axios.post(
        "http://localhost:5000/profilePictureUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.data.imagePath) {
        const imageUrl = `http://localhost:5000/uploads/profilePictures/${response.data.imagePath}`;
        setProfilePicture(imageUrl);
        setUserDetails((prev) => ({
          ...prev,
          profilePicture: response.data.imagePath,
        }));
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "changeProfile":
        return <ChangeProfile />;
      case "changePassword":
        return <ChangePassword />;
      case "location":
        return <Location />;
      case "logout":
        return <LogoutPrompt onClose={onClose} />;
      default:
        return (
          <div className="text-gray-500 text-lg text-center">
            Select an option to view details.
          </div>
        );
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Left Panel */}
      <div className="w-1/3 bg-green-800 text-white flex flex-col items-center py-8 shadow-lg">
        <div className="relative w-32 h-32 mb-4">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-white"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-full text-3xl font-bold text-white">
              {userDetails.firstName?.[0]}
              {userDetails.lastName?.[0]}
            </div>
          )}
          <label
            htmlFor="file-upload"
            className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-sm rounded-full opacity-0 hover:opacity-100 cursor-pointer"
          >
            <span className="text-white text-xl">📷</span>
            <span className="text-white text-xs">Add Photo</span>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <h3 className="text-xl font-semibold">
          {userDetails.firstName} {userDetails.lastName}
        </h3>
        <p className="text-sm text-gray-200 mb-6">{userDetails.email}</p>
        <ul className="space-y-3 w-3/4">
          <li
            className="bg-white bg-opacity-10 hover:bg-opacity-30 text-center py-2 rounded cursor-pointer"
            onClick={() => setActiveTab("changeProfile")}
          >
            Change Profile
          </li>
          <li
            className="bg-white bg-opacity-10 hover:bg-opacity-30 text-center py-2 rounded cursor-pointer"
            onClick={() => setActiveTab("changePassword")}
          >
            Change Password
          </li>
          <li
            className="bg-white bg-opacity-10 hover:bg-opacity-30 text-center py-2 rounded cursor-pointer"
            onClick={() => setActiveTab("location")}
          >
            Location
          </li>
          <li
            className="bg-red-600 hover:bg-red-700 text-center py-2 rounded cursor-pointer"
            onClick={() => setActiveTab("logout")}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Right Panel */}
      <div
        className="w-2/3 relative bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm" />
        <div className="relative z-10 w-full max-w-xl p-6 bg-white bg-opacity-90 rounded shadow-lg">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
