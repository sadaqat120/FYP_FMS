import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Vision from "./components/Vision";
import Services from "./components/Services";
import Footer from "./components/Footer";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <Vision />
      <Services />
      <Footer />
    </div>
  );
}

export default App;
