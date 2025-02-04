import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  // State to store input values and error message
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Handle Google Signup Click
  const handleGoogleSignup = () => {
    window.location.href = "https://accounts.google.com/signin";
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // If passwords match, clear the error and show success message
    setError("");
    alert("Signed up successfully!");
    navigate("/HomePage");
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        {/* Left Section */}
        <div className="signup-left">
          <h2>Come join us!</h2>
          <p>
            We are so excited to have you here! If you haven’t already, create an
            account to get access to exclusive offers, rewards, and discounts.
          </p>
          <button className="signin-btn" onClick={() => navigate("/LoginPage")}>
            Already have an account? Sign in.
          </button>
        </div>

        {/* Right Section - Signup Form */}
        <div className="signup-right">
          <h3 className="abcd">Signup</h3>
          <form onSubmit={handleSubmit}>
           
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              name="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {/* Error message below Confirm Password */}
            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="signup-btn">Signup</button>
          </form>

          {/* OR Divider */}
          <div className="or-divider">OR</div>

          {/* Social Signup Buttons */}
          <div className="social-signup">
            <button className="google-btn" onClick={handleGoogleSignup}>
              <i className="fa-brands fa-google"></i> Continue with Google
            </button>
            <button className="facebook-btn">
              <i className="fa-brands fa-facebook"></i> Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
