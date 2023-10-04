import React from "react";
import "../styles/App.css";
import ToggleBtn from "./toggleBtn/toggleBtn.jsx";
import { ThemeContext, Themes } from "./contexts/themeContext.jsx";

export default function Theme() {
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <section>
      <ThemeContext.Consumer>
        {({ changeTheme }) => (
          <ToggleBtn
            toggleDark={() => {
              setDarkMode(!darkMode);
              changeTheme(darkMode ? Themes.light : Themes.dark);
            }}
          />
        )}
      </ThemeContext.Consumer>
    </section>
  );
}
