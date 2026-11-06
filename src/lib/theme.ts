import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
const KEY = "orbit_theme";
const listeners = new Set<() => void>();

const systemTheme = (): Theme => (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");

/** The saved choice, or else the computer's own light/dark setting. */
export function getTheme(): Theme {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* storage blocked: fall through */ }
  return systemTheme();
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
}

export function setTheme(theme: Theme) {
  try { localStorage.setItem(KEY, theme); } catch { /* the choice just will not be remembered */ }
  applyTheme(theme);
  listeners.forEach((l) => l());
}

export const toggleTheme = () => setTheme(getTheme() === "dark" ? "light" : "dark");

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => { listeners.delete(cb); window.removeEventListener("storage", cb); };
};

export const useTheme = (): Theme => useSyncExternalStore(subscribe, getTheme, () => "dark");
