import { createContext } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: (mode: boolean) => void;
};
export const ThemeContext = createContext<ThemeContextType>({
  toggleDarkMode: () => {},
  darkMode: false,
});
