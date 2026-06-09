"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";

interface Site {
  id: string;
  businessName: string;
  status: string;
  updatedAt: string;
}

export function RecentBuilds() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sites?limit=5")
      .then((r) => r.json())
      .then((data) => {
        setSites(data.sites || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-navy-surface2 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  const statusVariant = (s: string) => {
    if (s === "live") return "live" as const;
    if (s === "building") return "building" as const;
    if (s === "draft") return "draft" as const;
    if (s === "error") return "error" as const;
    return "draft" as const;
  };

  return (
    <div className="space-y-0 divide-y divide-navy-border">
      {sites.map((site) => (
        <Link
          key={site.id}
          href={`/dashboard/sites/${site.id}`}
          className="flex items-center justify-between px-4 py-3 hover:bg-navy-surface2 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Pill variant={statusVariant(site.status)}>{site.status}</Pill>
            <span className="text-14 text-text-primary">{site.businessName}</span>
          </div>
          <span className="text-12 text-text-secondary font-mono">
            {new Date(site.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </Link>
      ))}
      {sites.length === 0 && (
        <div className="text-center py-8 text-text-secondary text-14">
          No sites built yet.
        </div>
      )}
    </div>
  );
}
