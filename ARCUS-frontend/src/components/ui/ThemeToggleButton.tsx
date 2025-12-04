import { useTheme } from "@app/providers/ThemeContext";
import { Moon, Sun } from "lucide-react";

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};
