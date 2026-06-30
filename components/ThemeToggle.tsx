"use client";

import { useTheme, Theme } from "@/context/ThemeProvider";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

interface ThemeToggleProps {
  variant?: "icon" | "dropdown";
}

export default function ThemeToggle({ variant = "icon" }: ThemeToggleProps) {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  if (variant === "dropdown") {
    return (
      <div className="flex rounded-xl border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-900">
        {options.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={[
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
              theme === value
                ? "bg-white dark:bg-gray-800 text-emerald-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
            ].join(" ")}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            {label}
          </button>
        ))}
      </div>
    );
  }

  const cycleTheme = () => {
    const order: Theme[] = ["light", "dark", "system"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  };

  const Icon =
    theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={cycleTheme}
      aria-label={`Theme: ${theme}. Click to change.`}
      title={`Theme: ${theme}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-emerald-200 hover:text-emerald-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-emerald-800 dark:hover:text-emerald-400"
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
    </motion.button>
  );
}
