"use client";

import { useEffect, useState } from "react";

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

  const isLight = mounted ? light : false;

  return (
    <button
      type="button"
      suppressHydrationWarning
      className={`liquid-glass-toggle ${isLight ? "light-mode" : "dark-mode"}`}
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {/* Curved glass refractive optical highlight overlay */}
      <span className="glass-meniscus-reflection" aria-hidden="true" />

      {/* Prismatic edge refractions */}
      <span className="glass-prism-warm" aria-hidden="true" />
      <span className="glass-prism-cool" aria-hidden="true" />

      {/* Sliding Glass Orb Thumb */}
      <span className={`liquid-glass-thumb ${isLight ? "thumb-right" : "thumb-left"}`} aria-hidden="true" />

      {/* Moon Slot (Left) */}
      <span className={`toggle-icon moon-icon ${!isLight ? "active-icon" : ""}`} aria-hidden="true">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* Sun Slot (Right) */}
      <span className={`toggle-icon sun-icon ${isLight ? "active-icon" : ""}`} aria-hidden="true">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.5" />
          <line x1="12" y1="2" x2="12" y2="4.5" />
          <line x1="12" y1="19.5" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4.5" y2="12" />
          <line x1="19.5" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
          <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
          <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
          <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
        </svg>
      </span>
    </button>
  );
}
