import { useTheme } from "@app/providers/ThemeContext";
import type { ReactNode } from "react";

type ThemeToggleProps = {
  children: ReactNode;
};

export const ThemeToggle = ({ children }: ThemeToggleProps) => {
  const { theme } = useTheme();
  return (
    <div className="theme-toggle">
      <div className="theme-toggle-inner">{children}</div>
      <div>{theme === "dark" ? "Dark Mode" : "Light Mode"}</div>
    </div>
  );
};
