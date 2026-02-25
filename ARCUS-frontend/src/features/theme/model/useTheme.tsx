import { useContext } from "react";

import { LOCAL_STORAGE_THEME_KEY, ThemeContext } from "@features/theme/model/ThemeContext";
import type { Theme } from "@features/theme/model/ThemeContext";

interface UseThemeResults {
  /** Current theme. */
  readonly theme?: Theme;
  /** Function to switch theme. */
  readonly toggleTheme: () => void;
}

export const useTheme = (): UseThemeResults => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  const { theme, setTheme } = context;

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme, toggleTheme };
};
