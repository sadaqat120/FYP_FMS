import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";

const Navbar = ({
  onSignUpClick,
  onLoginClick,
  isLoggedIn,
  onProfileClick,
  onNavigateToLanding,
  onAlertClick,
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
    <nav className="bg-emerald-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-green-300 transition"
          onClick={onNavigateToLanding}
        >
          Farm Management System
        </h1>

        {/* Center Links */}
        <div className="hidden md:flex gap-8 text-lg font-semibold">
          <a
            href="#hero-section"
            onClick={() => handleNavigation("hero-section")}
            className="hover:text-emerald-300 transition"
          >
            Home
          </a>
          <a
            href="#services-section"
            onClick={() => handleNavigation("services-section")}
            className="hover:text-emerald-300 transition"
          >
            Services
          </a>
          <a
            href="#about-section"
            onClick={() => handleNavigation("about-section")}
            className="hover:text-emerald-300 transition"
          >
            About
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Reminder Bell */}
          {isLoggedIn && (
            <div
              onClick={onAlertClick}
              className="text-[26px] hover:text-yellow-300 transition-transform transform hover:scale-125"
              title={
                reminderCount > 0
                  ? `You have ${reminderCount} reminders`
                  : "No reminders"
              }
            >
              <FaBell />
              {reminderCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {reminderCount}
                </span>
              )}
            </div>
          )}

          {/* Profile or Auth Buttons */}
          {isLoggedIn ? (
            <div
              onClick={onProfileClick}
              className="w-11 h-11 rounded-full border-2 border-white cursor-pointer overflow-hidden hover:scale-125 transition duration-300"
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-green-600 w-full h-full flex items-center justify-center text-white font-bold text-lg">
                  {getInitials(userDetails)}
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={onSignUpClick}
                className="bg-white text-emerald-900 font-semibold px-4 py-1.5 rounded hover:bg-gray-100 transition"
              >
                Sign Up
              </button>
              <button
                onClick={onLoginClick}
                className="bg-white text-emerald-900 font-semibold px-4 py-1.5 rounded hover:bg-gray-100 transition"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
