import { createContext } from "react";

export const Themes = {
  dark: "",
  light: "white-content",
};

export const ThemeContext = createContext({
  theme: Themes.dark,
  changeTheme: () => {},
});
