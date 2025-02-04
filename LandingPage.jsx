import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Make sure to replace this with the correct path to your CSS file

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="overlay-container">
        <p className="overlay-text">
          Welcome to Ticket Booking
        </p>
        <p className="overlay">
          Book your movie tickets easily, choose your seats, and enjoy the show!
        </p>

        
      </div>
      <div className="buttons-container">
          <button
            className="button login"
            onClick={() => navigate("/LoginPage")}
          >
            Login
          </button>
          <button
            className="button sign-up"
            onClick={() => navigate("/SignupPage")}
          >
            Sign Up
          </button>
        </div>
    </div>
  );
};

export default LandingPage;
