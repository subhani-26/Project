import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-background">
      <div className="auth-container">
        <h1 className="overlay-text">Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Logged in!");
            navigate("/HomePage");
          }}
        >
          <div className="input-group">
            <input type="text" id="username" placeholder="Username" required />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="button login-btn">
            LOGIN-IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
