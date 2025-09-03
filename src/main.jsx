import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTops from "./Others/ScrollToTops.js";
import { UserProvider } from "./context/UserContext.jsx"; // path must match your folder
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <ScrollToTops />
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>
);





