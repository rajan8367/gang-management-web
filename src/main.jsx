import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "./assets/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/app.min.css";
import "./assets/css/custom.min.css";
import "./assets/css/icons.min.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
