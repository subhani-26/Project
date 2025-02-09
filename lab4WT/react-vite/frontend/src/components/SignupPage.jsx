import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate(); // React Router navigation
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSignup = (e) => {
    e.preventDefault();

    if (!passwordPattern.test(password)) {
      setError("Password must be at least 8 characters long, include a letter, a number, and a special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    alert("Signup successful (simulated).");

    // Redirect to homepage
    navigate("/HomePage"); // Use React Router
    // OR, use window.location.href if React Router is not available
    // window.location.href = "/HomePage";
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="signup-left">
          <h2>Come join us!</h2>
          <p>Create an account to get access to exclusive offers, rewards, and discounts.</p>
          <button className="signin-btn">Already have an account? Sign in.</button>
        </div>

        <div className="signup-right">
          <h3 className="ki">Signup</h3>
          <form onSubmit={handleSignup}>
            <input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value.trim())}
              value={username}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
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
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="signup-btn">Signup</button>
          </form>

          <div className="or-divider">OR</div>
          <div className="social-signup">
            <button className="google-btn">
              <FaGoogle className="header-icon" /> Continue with Google
            </button>
            <button className="facebook-btn">
              <FaFacebook className="header-icon" /> Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
