import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Farm Management System</h1>
      <div className="nav-center">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
      </div>
      <div className="nav-auth">
        <a href="#signup">Sign Up</a>
        <a href="#login">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
