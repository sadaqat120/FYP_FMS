import React from "react";
import "./Navbar.css";

const Navbar = ({
  onSignUpClick,
  onLoginClick,
  isLoggedIn,
  userDetails,
  onProfileClick,
  onNavigateToLanding,
}) => {
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
      <div className="nav-center">
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
      <div className="nav-auth">
        {isLoggedIn ? (
          <div className="profile-initials" onClick={onProfileClick}>
            {getInitials(userDetails)}
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
