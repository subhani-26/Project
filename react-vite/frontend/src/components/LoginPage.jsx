import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Logged in successfully!");
        navigate("/HomePage");
      } else {
        setError(data.error || "Invalid login credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="loginpage-container">
      <div className="loginpage-card">
        <div className="loginpage-left">
          <h2 className="loginpage-welcome">Welcome Back!</h2>
          <p className="loginpage-message">
            We are glad to see you again. Please log in to access your account.
          </p>
          <button className="loginpage-signup-btn" onClick={() => navigate("/SignupPage")}>
            Don't have an account? Sign up.
          </button>
        </div>

        <div className="loginpage-right">
          <h1 className="loginpage-title">Login</h1>
          <form onSubmit={handleSubmit} className="loginpage-form">
            <input
              type="email"
              name="email"
              className="loginpage-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              className="loginpage-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="loginpage-error">{error}</p>}

            <button type="submit" className="loginpage-submit-btn">
              Login
            </button>
          </form>

          <div className="loginpage-divider">OR</div>

          <div className="loginpage-social">
            <button className="loginpage-google-btn">Login with Google</button>
            <button className="loginpage-facebook-btn">Login with Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;