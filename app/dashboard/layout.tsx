"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-base">
      <Sidebar />
      <div className="ml-60">
        <Topbar />
        <main className="p-6 max-w-[1280px]">
          {children}
        </main>
      </div>
    </div>
  );
}
