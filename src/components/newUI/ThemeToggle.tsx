import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200"
      style={{
        color: "hsl(var(--foreground))",
        background: "hsl(var(--secondary))",
      }}
    >
      <Sun size={16} strokeWidth={1.8} className="block dark:hidden" />
      <Moon size={16} strokeWidth={1.8} className="hidden dark:block" />
    </button>
  );
}
