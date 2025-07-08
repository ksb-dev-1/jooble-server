"use client";

import { useTheme } from "@/app/ThemeProvider";

// 3rd party
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border hover:bg-dark dark:hover:bg-light transition-colors"
      type="button"
      aria-label={isLight ? "Activate dark mode" : "Activate light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight ? <FiMoon className="h-4 w-4" /> : <FiSun className="h-4 w-4" />}
    </button>
  );
}
