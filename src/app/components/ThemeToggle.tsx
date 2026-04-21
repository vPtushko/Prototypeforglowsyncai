import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";

interface ThemeToggleProps {
  compact?: boolean;
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: "light" as const, icon: Sun, label: "Light", color: "from-amber-400 to-orange-400" },
    { value: "dark" as const, icon: Moon, label: "Dark", color: "from-indigo-500 to-purple-500" },
    { value: "auto" as const, icon: Monitor, label: "Auto", color: "from-cyan-400 to-blue-500" },
  ];

  const currentTheme = themes.find((t) => t.value === theme) || themes[2];
  const Icon = currentTheme.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${compact ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-9 h-9'} rounded-lg bg-gradient-to-br ${currentTheme.color} flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95`}
        aria-label="Toggle theme"
      >
        <Icon className={`${compact ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-4 h-4'} text-white`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            {themes.map((t) => {
              const ThemeIcon = t.icon;
              return (
                <button
                  key={t.value}
                  onClick={() => {
                    setTheme(t.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm transition-colors flex items-center gap-3 ${
                    theme === t.value
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                    <ThemeIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  {t.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
