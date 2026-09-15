"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, Hospital, LayoutDashboard, Siren, Users, ShieldCheck, Ambulance, Building2, Settings2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface TopNavProps { role?: "USER" | "HOSPITAL" | "ADMIN"; }

export default function TopNav({ role = "USER" }: TopNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHospital = pathname?.startsWith("/hospital");
  const isAdmin = pathname?.startsWith("/admin");
  const isAmbulance = pathname?.startsWith("/ambulance") || pathname?.startsWith("/user");
  const activeRole = isAdmin ? "ADMIN" : isHospital ? "HOSPITAL" : isAmbulance ? "USER" : role;

  const links = activeRole === "USER"
    ? [
        { label: "Overview", href: "/ambulance/dashboard", icon: LayoutDashboard },
        { label: "Cases", href: "/user/history", icon: Activity },
        { label: "Hospitals", href: "/user/hospitals", icon: Hospital },
      ]
    : activeRole === "HOSPITAL"
      ? [
          { label: "Inbox", href: "/hospital/dashboard", icon: Activity },
          { label: "Active cases", href: "/hospital/active-cases", icon: Siren },
          { label: "Resources", href: "/hospital/resources", icon: Hospital },
        ]
      : [
          { label: "Command", href: "/admin/dashboard", icon: LayoutDashboard },
          { label: "Hospitals", href: "/admin/hospitals", icon: Hospital },
          { label: "Emergencies", href: "/admin/emergencies", icon: Siren },
          { label: "Users", href: "/admin/users", icon: Users },
        ];

  return (
    <header className="apple-nav">
      <div className="apple-nav-inner">
        <Link href="/" className="brand-mark" aria-label="EMEFast home">
          <span className="brand-icon"><Activity size={16} /></span>
          <span>EMEFast <small>AI</small></span>
        </Link>

        <div className="role-switcher" aria-label="Switch workspace">
          <button
            type="button"
            className={activeRole === "USER" ? "active" : ""}
            aria-pressed={activeRole === "USER"}
            title="Ambulance workspace"
            onClick={() => router.push("/ambulance/dashboard")}
          >
            <Ambulance size={14} />
            <span>Ambulance</span>
          </button>
          <button
            type="button"
            className={activeRole === "HOSPITAL" ? "active" : ""}
            aria-pressed={activeRole === "HOSPITAL"}
            title="Hospital workspace"
            onClick={() => router.push("/hospital/dashboard")}
          >
            <Building2 size={14} />
            <span>Hospital</span>
          </button>
          <button
            type="button"
            className={activeRole === "ADMIN" ? "active" : ""}
            aria-pressed={activeRole === "ADMIN"}
            title="Admin workspace"
            onClick={() => router.push("/admin/dashboard")}
          >
            <Settings2 size={14} />
            <span>Admin</span>
          </button>
        </div>

        <nav className="apple-nav-pills" aria-label="Primary navigation">
          {links.map(({ label, href, icon: Icon }) => {
            const active = href === "/ambulance/dashboard"
              ? pathname === "/ambulance/dashboard" || pathname === "/user/dashboard" || pathname === "/"
              : pathname === href || pathname?.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} className={`apple-nav-pill ${active ? "active" : ""}`}>
                <Icon size={14} /> <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="apple-nav-quick-actions">
          <ThemeToggle />
          <button type="button" className="nav-sos" onClick={() => router.push("/ambulance/emergency/new")} aria-label="Open emergency">
            <Siren size={14} /> <span>Emergency</span>
          </button>
        </div>
      </div>
      <div className="apple-nav-subbar">
        <span><ShieldCheck size={12} /> Verified hospital coordination</span>
        <span className="subbar-note">No ambulance dispatch · recommendation & coordination only</span>
      </div>
    </header>
  );
}
