"use client";

import { useEffect, useState } from "react";

interface Activity {
  id: string;
  type: string;
  message: string;
  createdAt: string;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/workspace?include=activities")
      .then((r) => r.json())
      .then((data) => {
        setActivities(data.activities || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 bg-navy-surface2 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {activities.map((a) => (
        <div key={a.id} className="flex items-start gap-2 text-13 font-mono">
          <span className="text-text-secondary whitespace-nowrap">
            [{new Date(a.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}]
          </span>
          <span className="text-text-primary">{a.type}</span>
          {a.message && (
            <span className="text-text-secondary truncate">{a.message}</span>
          )}
        </div>
      ))}
      {activities.length === 0 && (
        <p className="text-13 text-text-secondary font-mono">No activity yet.</p>
      )}
    </div>
  );
}
