"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((nextTheme: Theme) => {
    const resolved =
      nextTheme === "system" ? getSystemTheme() : nextTheme;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);
    document.documentElement.style.colorScheme = resolved;
    setResolvedTheme(resolved);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.theme) as Theme | null;
    const initial = stored ?? "system";
    setThemeState(initial);
    applyTheme(initial);
    setMounted(true);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if ((localStorage.getItem(STORAGE_KEYS.theme) ?? "system") === "system") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [applyTheme]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      localStorage.setItem(STORAGE_KEYS.theme, next);
      applyTheme(next);
    },
    [applyTheme]
  );

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, mounted }),
    [theme, resolvedTheme, setTheme, mounted]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
