import { useTheme } from "@app/providers/ThemeContext";
import { Moon, Sun } from "lucide-react";

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button type="button" onClick={toggleTheme} aria-label="toggle theme" aria-pressed={isDark}>
      <span className="toggle-icon-wrap">
        <Sun size={18} style={{ color: `rgb(var(--toggle-sun-color))` }} />
      </span>
      <span className="toggle-icon-wrap">
        <Moon size={18} style={{ color: `rgb(var(--toggle-moon-color))` }} />
      </span>
      <span className={`theme-toggle-thumb ${isDark ? "translate-x-26" : "translate-x-0"}`}></span>
    </button>
  );
};
