import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUpModal from "./components/Authentication/SignUpModal";
import LoginModal from "./components/Authentication/LoginModal";
import Profile from "./components/profile/Profile";
import ServiceReminders from "./components/ServiceReminders/ServiceReminders";
import CropManagement from "./components/CropManagement/CropManagement";
import LivestockManagement from "./components/LivestockManagement/LivestockManagement";
import ResourceManagement from "./components/ResourceManagement/ResourceManagement";
import MainChatBot from "./components/ChatBot/frontend/MainChatBot";

const App = () => {
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showServiceReminders, setShowServiceReminders] = useState(false);
  const [showCropManagement, setShowCropManagement] = useState(false);
  const [showLivestockManagement, setShowLivestockManagement] = useState(false);
  const [showResourceManagement, setShowResourceManagement] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setLoginOpen(false);
  };

  const handleSignUpSuccess = () => {
    setSignUpOpen(false);
  };

  const toggleProfile = () => setShowProfile(!showProfile);

  const navigateToLanding = () => {
    setShowProfile(false);
    setShowServiceReminders(false);
    setShowCropManagement(false);
    setShowLivestockManagement(false);
    setShowResourceManagement(false);
    setShowChatBot(false);
  };

  const handleServiceReminderClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setShowServiceReminders(true);
    }
  };

  const handleCropManagementClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setShowCropManagement(true);
    }
  };

  const handleLivestockManagementClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setShowLivestockManagement(true);
    }
  };

  const handleResourceManagementClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setShowResourceManagement(true);
    }
  };

  const handleChatBotClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setShowChatBot(true);
    }
  };

  return (
    <>
      <Navbar
        onSignUpClick={() => setSignUpOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
        isLoggedIn={isLoggedIn}
        onProfileClick={toggleProfile}
        onNavigateToLanding={navigateToLanding}
      />
      {showProfile ? (
        <Profile onClose={toggleProfile} />
      ) : showServiceReminders ? (
        <ServiceReminders onBackToLanding={navigateToLanding} />
      ) : showCropManagement ? (
        <CropManagement onBackToLanding={navigateToLanding} />
      ) : showLivestockManagement ? (
        <LivestockManagement onBackToLanding={navigateToLanding} />
      ) : showResourceManagement ? (
        <ResourceManagement onBackToLanding={navigateToLanding} />
      ) : showChatBot ? (
        <MainChatBot onBackToLanding={navigateToLanding} />
      ) : (
        <LandingPage
          isLoggedIn={isLoggedIn}
          navigateToLogin={() => setLoginOpen(true)}
          onReminderServiceClick={handleServiceReminderClick}
          onCropManagementClick={handleCropManagementClick}
          onLivestockManagementClick={handleLivestockManagementClick}
          onResourceManagementClick={handleResourceManagementClick}
          onChatBotClick={handleChatBotClick}
        />
      )}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSignUpSuccess={handleSignUpSuccess}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default App;
