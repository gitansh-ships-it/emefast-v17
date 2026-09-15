"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("emefast-theme");
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;
    const next = saved ? saved === "light" : prefersLight;
    document.documentElement.classList.toggle("theme-light", next);
    document.documentElement.classList.toggle("theme-dark", !next);
    setLight(next);
  }, []);

  const toggle = () => {
    const next = !light;
    document.documentElement.classList.toggle("theme-light", next);
    document.documentElement.classList.toggle("theme-dark", !next);
    localStorage.setItem("emefast-theme", next ? "light" : "dark");
    setLight(next);
  };

  const displayLight = mounted ? light : false;

  return (
    <button
      type="button"
      suppressHydrationWarning
      className="theme-toggle"
      onClick={toggle}
      aria-label={displayLight ? "Switch to dark mode" : "Switch to light mode"}
      title={displayLight ? "Dark mode" : "Light mode"}
    >
      <span className={`theme-toggle-icon ${!displayLight ? "active" : ""}`} aria-hidden="true"><Moon size={14} strokeWidth={2.1} /></span>
      <span className={`theme-toggle-icon ${displayLight ? "active" : ""}`} aria-hidden="true"><Sun size={14} strokeWidth={2.1} /></span>
      <span className="theme-toggle-thumb" />
    </button>
  );
}
