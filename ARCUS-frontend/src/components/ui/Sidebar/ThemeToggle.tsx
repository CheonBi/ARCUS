import { useTheme } from "@app/providers/ThemeContext";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const LightIcon = () => {
    return <Sun size={18} style={{ color: `rgb(var(--toggle-icon-color))` }} />;
  };

  const DarkIcon = () => {
    return <Moon size={18} style={{ color: `rgb(var(--toggle-icon-color))` }} />;
  };

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <span className="toggle-icon-wrap">{isDark ? <DarkIcon /> : <LightIcon />}</span>
      <div className="toggle-label">{theme === "dark" ? "Dark Mode" : "Light Mode"}</div>
    </div>
  );
};
