import React from "react";
import "./toggleBtn.css";

export default function ToggleDark(props) {
  return (
    <div className="toggle">
      <div className="toggle-switch">
        <label>
          <input
            type="checkbox"
            id="checkbox-toggle"
            onClick={() => {
              props.toggleDark();
            }}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}
