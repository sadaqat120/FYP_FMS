import React from "react";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Smart Farming, Managed Together!</h1>
        <p>
          From real-time crop tracking to efficient livestock management and
          resource optimization, revolutionize your farming operations and
          enhance productivity today.
        </p>
        <button className="button">Get Started</button>
      </div>
    </section>
  );
};

export default HeroSection;
