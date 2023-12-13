import React, { useState, useEffect } from "react";
import { ThemeContext, Themes } from "./themeContext.jsx";

export default function ThemeContextWrapper(props) {
  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme ? savedTheme : Themes.dark);

  function changeTheme(theme) {
    setTheme(theme);
    setThemeInStorage(theme);
  }

  const setThemeInStorage = (theme) => {
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    switch (theme) {
      case Themes.light:
        document.body.classList.add("white-content");
        break;
      case Themes.dark:
        document.body.classList.remove("white-content");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
