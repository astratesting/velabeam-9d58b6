"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  Radar,
  Globe,
  Grid3X3,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Today", icon: LayoutDashboard },
  { href: "/dashboard/leads", label: "Leads", icon: Radar },
  { href: "/dashboard/sites", label: "Sites", icon: Globe },
  { href: "/dashboard/templates", label: "Templates", icon: Grid3X3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-navy-base border-r border-navy-border flex flex-col z-40">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-navy-border">
        <Link href="/dashboard" className="text-18 font-display font-bold text-cobalt">
          Vela<span className="text-text-primary">Beam</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-8 text-14 transition-colors duration-150",
                isActive
                  ? "bg-navy-surface2 text-text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-navy-surface1"
              )}
            >
              <item.icon size={18} strokeWidth={1.5} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-navy-border">
        <p className="text-12 text-text-secondary">VelaBeam v0.1.0</p>
      </div>
    </aside>
  );
}
