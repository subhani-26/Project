import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    letters: false,
    numbers: false,
    special: false,
  });

  const checkPasswordRequirements = (password) => {
    const requirements = {
      length: password.length >= 8,
      letters: /[a-zA-Z]/.test(password),
      numbers: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordRequirements(requirements);
    return Object.values(requirements).every(Boolean);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordRequirements(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!checkPasswordRequirements(password)) {
      setError("Please meet all password requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("username", data.username); // Store the username
        console.log("Saving username to localStorage:", data.username);
        alert("Signed up successfully!");
        navigate("/HomePage"); 
      } else {
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signuppage-container">
      <div className="signuppage-card">
        <div className="signuppage-left">
          <h2 className="signuppage-welcome">Come join us!</h2>
          <p className="signuppage-message">
            We are so excited to have you here! If you haven't already, create an
            account to get access to exclusive offers, rewards, and discounts.
          </p>
          <button className="signuppage-signin-btn" onClick={() => navigate("/LoginPage")}>
            Already have an account? Sign in.
          </button>
        </div>

        <div className="signuppage-right">
          <h1 className="signuppage-title">Signup</h1>
          <form onSubmit={handleSubmit} className="signuppage-form">
            <input
              type="text"
              name="username"
              className="signuppage-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              className="signuppage-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              className="signuppage-input"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <input
              type="password"
              name="confirm-password"
              className="signuppage-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="signuppage-password-requirements">
              Password requirements:
              <ul>
                <li className={passwordRequirements.length ? 'requirement-met' : 'requirement-not-met'}>At least 8 characters</li>
                <li className={passwordRequirements.letters ? 'requirement-met' : 'requirement-not-met'}>Letters</li>
                <li className={passwordRequirements.numbers ? 'requirement-met' : 'requirement-not-met'}>Numbers</li>
                <li className={passwordRequirements.special ? 'requirement-met' : 'requirement-not-met'}>Special characters</li>
              </ul>
            </div>

            {error && <p className="signuppage-error">{error}</p>}

            <button type="submit" className="signuppage-submit-btn">
              Signup
            </button>
          </form>

          <div className="signuppage-divider">OR</div>

          <div className="signuppage-social">
            <button className="signuppage-google-btn">
              <FaGoogle className="signuppage-social-icon" /> Continue with Google
            </button>
            <button className="signuppage-facebook-btn">
              <FaFacebook className="signuppage-social-icon" /> Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;