import React, { useState, useEffect } from "react";
import { ThemeContext, Themes } from "./themeContext.jsx";

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(Themes.dark);

  function changeTheme(theme) {
    setTheme(theme);
  }

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
