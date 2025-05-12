import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";

const Navbar = ({
  onSignUpClick,
  onLoginClick,
  isLoggedIn,
  onProfileClick,
  onNavigateToLanding,
  onAlertClick
}) => {
  const [userDetails, setUserDetails] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [reminderCount, setReminderCount] = useState(0);

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

    const fetchReminderCount = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/reminders", {
            headers: { Authorization: token },
          });
          setReminderCount(response.data.length);
        } catch (err) {
          console.error("Error fetching reminders:", err);
        }
      }
    };

    if (isLoggedIn) {
      fetchUserDetails();
      fetchReminderCount();
    }
  }, [isLoggedIn]);

  const handleNavigation = (sectionId) => {
    onNavigateToLanding();
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const getInitials = (user) => {
    if (!user) return "";
    const { firstName = "", lastName = "" } = user;
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-emerald-900 text-white sticky top-0 z-50">
      <h1 className="text-xl font-bold">Farm Management System</h1>

      <div className="flex gap-6 font-semibold">
        <a href="#hero-section" onClick={() => handleNavigation("hero-section")} className="hover:bg-white hover:text-emerald-900 px-3 py-1 rounded transition">
          Home
        </a>
        <a href="#services-section" onClick={() => handleNavigation("services-section")} className="hover:bg-white hover:text-emerald-900 px-3 py-1 rounded transition">
          Services
        </a>
        <a href="#about-section" onClick={() => handleNavigation("about-section")} className="hover:bg-white hover:text-emerald-900 px-3 py-1 rounded transition">
          About
        </a>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <div
            onClick={onAlertClick}
            title={reminderCount > 0 ? `You have ${reminderCount} reminders` : "No reminders"}
            className="relative text-white text-xl cursor-pointer hover:scale-125 transition-transform w-10 h-10 flex items-center justify-center mr-3"
          >
            <FaBell />
            {reminderCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {reminderCount}
              </span>
            )}
          </div>
        )}

        {isLoggedIn ? (
          <div
            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer flex items-center justify-center hover:scale-110 transition-transform"
            onClick={onProfileClick}
          >
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="bg-green-500 text-white font-bold w-full h-full flex items-center justify-center rounded-full text-sm hover:bg-gray-500">
                {getInitials(userDetails)}
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={onSignUpClick}
              className="bg-white text-emerald-900 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition"
            >
              Sign Up
            </button>
            <button
              onClick={onLoginClick}
              className="bg-white text-emerald-900 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition"
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
