// src/App.js
import React from "react";
// import { Routes, Route } from "react-router-dom"; // Use Routes instead of Switch
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage"; // Import LoginPage
import SignupPage from "./components/SignupPage"; // Import SignupPage
import HomePage from "./components/HomePage"; // Import HomePage
import Searchbar from "./components/Searchbar";
import Theaters from "./components/Theaters";
import Profile from "./components/Profile";
import BuyTicket from "./components/BuyTicket";
import Seating from "./components/Seating";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
      <Route path="/LoginPage" element={<LoginPage />} /> {/* Login Page */}
      <Route path="/SignupPage" element={<SignupPage />} /> {/* Signup Page */}
      <Route path="/HomePage" element={<HomePage />} /> {/* Home Page */}
      <Route path="/Searchbar" element={<Searchbar />} />
      <Route path="/Theaters" element={<Theaters />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/BuyTicket" element={<BuyTicket />}/>
      <Route path="/Seating" element={<Seating />}/>
    </Routes>
  );
};

export default App;
