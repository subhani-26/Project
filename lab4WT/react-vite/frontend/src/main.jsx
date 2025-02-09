// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App"; // Import your main App component
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
