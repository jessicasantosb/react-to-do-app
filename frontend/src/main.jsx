import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/App.css";
import ThemeContextWrapper from "./components/contexts/themeContextWrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextWrapper>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeContextWrapper>
);
