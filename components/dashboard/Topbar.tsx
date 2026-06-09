"use client";

import { useSession, signOut } from "next-auth/react";
import { Search, LogOut } from "lucide-react";

export function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="h-14 bg-navy-base border-b border-navy-border flex items-center px-6 sticky top-0 z-30">
      {/* Breadcrumb area */}
      <div className="flex-1" />

      {/* Search placeholder */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-navy-surface1 border border-navy-border rounded-8 text-text-secondary text-13 w-64">
        <Search size={14} strokeWidth={1.5} />
        <span>Search... (⌘K)</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-4">
        {session?.user?.workspaceSlug && (
          <span className="text-13 text-text-secondary font-mono">
            {session.user.workspaceSlug}
          </span>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-navy-surface2 flex items-center justify-center text-13 text-text-primary font-medium">
            {session?.user?.name?.[0] || session?.user?.email?.[0]?.toUpperCase() || "?"}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-text-secondary hover:text-text-primary transition-colors"
            title="Sign out"
          >
            <LogOut size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
