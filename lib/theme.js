"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext(null);

const THEMES = {
  light: "light",
  dark: "dark",
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const [accentColor, setAccentColor] = useState("#059669");

  useEffect(() => {
    const saved = localStorage.getItem("shahin-theme");
    let m = "dark", c = "#059669";
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        m = parsed.mode || "dark";
        c = parsed.accent || "#059669";
        setMode(m);
        setAccentColor(c);
      } catch { }
    }
    applyTheme(m, c);
  }, []);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "5, 150, 105";
  };

  const applyTheme = useCallback((m, color) => {
    const root = document.documentElement;
    if (m === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.setProperty("--accent-color", color);
    root.style.setProperty("--accent-hover", color);
    root.style.setProperty("--accent-rgb", hexToRgb(color));
  }, []);

  const toggleMode = useCallback(() => {
    setMode(prev => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next, accentColor);
      localStorage.setItem("shahin-theme", JSON.stringify({ mode: next, accent: accentColor }));
      return next;
    });
  }, [accentColor, applyTheme]);

  const changeAccent = useCallback((color) => {
    setAccentColor(color);
    applyTheme(mode, color);
    localStorage.setItem("shahin-theme", JSON.stringify({ mode, accent: color }));
  }, [mode, applyTheme]);

  return (
    <ThemeContext.Provider value={{ mode, accentColor, toggleMode, changeAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
