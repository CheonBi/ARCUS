import { createContext } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const LOCAL_STORAGE_THEME_KEY = "theme";
