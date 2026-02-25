import {
  LOCAL_STORAGE_THEME_KEY,
  ThemeContext,
  type Theme,
} from "@features/theme/model/ThemeContext";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react";

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || "light";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return <ThemeContext.Provider value={defaultValue}>{children}</ThemeContext.Provider>;
};
