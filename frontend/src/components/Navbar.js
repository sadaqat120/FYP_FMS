import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";

const Navbar = ({
  onSignUpClick,
  onLoginClick,
  isLoggedIn,
  onProfileClick,
  onNavigateToLanding,
}) => {
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [profilePicture, setProfilePicture] = useState(null); // State to store profile picture

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
  }, [isLoggedIn]); // Fetch user details when the user logs in

  const handleNavigation = (sectionId) => {
    onNavigateToLanding();
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  // Extract initials from userDetails
  const getInitials = (user) => {
    if (!user) return "";
    const { firstName = "", lastName = "" } = user;
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="navbar">
      <h1>Farm Management System</h1>
      <div className="navbar-nav-center">
        <a href="#hero-section" onClick={() => handleNavigation("hero-section")}>
          Home
        </a>
        <a
          href="#services-section"
          onClick={() => handleNavigation("services-section")}
        >
          Services
        </a>
        <a href="#about-section" onClick={() => handleNavigation("about-section")}>
          About
        </a>
      </div>
      <div className="navbar-nav-auth">
        {isLoggedIn ? (
          <div className="navbar-profile-icon" onClick={onProfileClick}>
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="navbar-profile-picture" />
            ) : (
              <div className="navbar-profile-initials">
                {getInitials(userDetails)}
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={onSignUpClick} className="button">
              Sign Up
            </button>
            <button onClick={onLoginClick} className="button">
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;