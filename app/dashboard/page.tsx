"use client";

import { useEffect, useState } from "react";
import { KpiTile } from "@/components/dashboard/KpiTile";
import { LeadQueue } from "@/components/dashboard/LeadQueue";
import { RecentBuilds } from "@/components/dashboard/RecentBuilds";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Card } from "@/components/ui/Card";
import { Globe, Radar, Hammer, Rocket } from "lucide-react";

interface Stats {
  sitesLive: number;
  leadsThisWeek: number;
  buildsInProgress: number;
  deploysThisMonth: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    sitesLive: 0,
    leadsThisWeek: 0,
    buildsInProgress: 0,
    deploysThisMonth: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        const [sitesRes, leadsRes] = await Promise.all([
          fetch("/api/sites?status=live&limit=1"),
          fetch("/api/leads?limit=1"),
        ]);
        const sitesData = await sitesRes.json();
        const leadsData = await leadsRes.json();
        setStats({
          sitesLive: sitesData.total || 0,
          leadsThisWeek: leadsData.total || 0,
          buildsInProgress: 0,
          deploysThisMonth: sitesData.total || 0,
        });
      } catch {
        // defaults to 0
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-24 font-semibold text-text-primary font-sans">Today</h1>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile label="Sites Live" value={stats.sitesLive} icon={<Globe size={24} strokeWidth={1.5} />} />
        <KpiTile label="Leads This Week" value={stats.leadsThisWeek} icon={<Radar size={24} strokeWidth={1.5} />} />
        <KpiTile label="Builds In Progress" value={stats.buildsInProgress} icon={<Hammer size={24} strokeWidth={1.5} />} />
        <KpiTile label="Deploys This Month" value={stats.deploysThisMonth} icon={<Rocket size={24} strokeWidth={1.5} />} />
      </div>

      {/* Middle: Lead queue + Recent builds */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card padding="none" className="lg:col-span-3">
          <div className="px-4 py-3 border-b border-navy-border">
            <h2 className="text-16 font-semibold text-text-primary font-sans">Lead Queue</h2>
          </div>
          <LeadQueue />
        </Card>
        <Card padding="none" className="lg:col-span-2">
          <div className="px-4 py-3 border-b border-navy-border">
            <h2 className="text-16 font-semibold text-text-primary font-sans">Recent Builds</h2>
          </div>
          <RecentBuilds />
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <h2 className="text-16 font-semibold text-text-primary font-sans mb-4">Pipeline Activity</h2>
        <ActivityFeed />
      </Card>
    </div>
  );
}
