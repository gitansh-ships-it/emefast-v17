"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, Siren, ShieldCheck, Ambulance, Building2, Settings2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import FloatingDock from "@/components/FloatingDock";

interface TopNavProps {
  role?: "USER" | "HOSPITAL" | "ADMIN";
}

export default function TopNav({ role = "USER" }: TopNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHospital = pathname?.startsWith("/hospital");
  const isAdmin = pathname?.startsWith("/admin");
  const isAmbulance = pathname?.startsWith("/ambulance") || pathname?.startsWith("/user");
  const activeRole = isAdmin ? "ADMIN" : isHospital ? "HOSPITAL" : isAmbulance ? "USER" : role;

  return (
    <>
      <header className="apple-nav">
        <div className="apple-nav-inner">
          {/* Row 1 (44px): Logo, Flexible Spacer, Theme Toggle (44x44) + SOS (56x44) */}
          <div className="apple-nav-row-1">
            <Link href="/" className="liquid-logo-link" aria-label="EMEFast home">
              <span className="liquid-logo" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13h4l4-8 3.5 14 3-6h3.5" />
                </svg>
              </span>
              <div className="liquid-brand-col">
                <div className="liquid-wordmark">
                  <span className="brand-eme">EME</span>
                  <span className="brand-fast">
                    Fast
                    <span className="brand-speed-streak" aria-hidden="true">
                      <span className="streak-main" />
                      <span className="streak-sub" />
                      <span className="streak-flare" />
                    </span>
                  </span>
                </div>
                <span className="brand-subtitle">EMERGENCY COORDINATION AI</span>
              </div>
            </Link>

            <div className="apple-nav-spacer" />

            <div className="apple-nav-actions-group">
              <div className="liquid-theme-wrapper" title="Toggle theme">
                <ThemeToggle />
              </div>
              <button
                type="button"
                className="nav-sos-liquid"
                onClick={() => router.push("/ambulance/emergency/new")}
                aria-label="Open emergency SOS"
                title="Open emergency SOS"
              >
                <Siren size={18} strokeWidth={2.4} />
                <span>SOS</span>
              </button>
            </div>
          </div>

          {/* Row 2 (36px): Full-width Apple Segmented Control */}
          <div className="role-switcher" aria-label="Switch workspace">
            <button
              type="button"
              className={activeRole === "USER" ? "active" : ""}
              aria-pressed={activeRole === "USER"}
              title="Ambulance workspace"
              onClick={() => router.push("/ambulance/dashboard")}
            >
              <Ambulance size={14} strokeWidth={2.2} />
              <span>Ambulance</span>
            </button>
            <button
              type="button"
              className={activeRole === "HOSPITAL" ? "active" : ""}
              aria-pressed={activeRole === "HOSPITAL"}
              title="Hospital workspace"
              onClick={() => router.push("/hospital/dashboard")}
            >
              <Building2 size={14} strokeWidth={2.2} />
              <span>Hospital</span>
            </button>
            <button
              type="button"
              className={activeRole === "ADMIN" ? "active" : ""}
              aria-pressed={activeRole === "ADMIN"}
              title="Admin workspace"
              onClick={() => router.push("/admin/dashboard")}
            >
              <Settings2 size={14} strokeWidth={2.2} />
              <span>Admin</span>
            </button>
          </div>
        </div>

        <div className="apple-nav-subbar">
          <span><ShieldCheck size={12} /> Verified hospital coordination</span>
          <span className="subbar-note">No ambulance dispatch · recommendation & coordination only</span>
        </div>
      </header>

      {/* Floating Navigation Dock (12px below header) */}
      <FloatingDock role={activeRole} />
    </>
  );
}
