import {useState} from "react";
import "../../styles/App.css";
import ToggleBtn from "./toggleBtn.jsx";
import { ThemeContext, Themes } from "../contexts/themeContext.jsx";

export default function Theme() {
  const savedTheme = localStorage.getItem('theme');
  const [darkMode, setDarkMode] = useState(savedTheme === Themes.light);

  return (
    <section>
      <ThemeContext.Consumer>
        {({ changeTheme }) => (
          <ToggleBtn
          toggleDark={() => {
            const newMode = !darkMode;
            setDarkMode(newMode);
            changeTheme(newMode ? Themes.light : Themes.dark);
            localStorage.setItem('theme', newMode ? Themes.light : Themes.dark);
          }}
          isDark={darkMode}
        />
        )}
      </ThemeContext.Consumer>
    </section>
  );
}
