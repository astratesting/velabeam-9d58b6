"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { SkeletonTable } from "@/components/ui/Skeleton";

interface Lead {
  id: string;
  businessName: string;
  category: string;
  city: string;
  status: string;
  googleRating: number | null;
}

export function LeadQueue() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads?limit=5")
      .then((r) => r.json())
      .then((data) => {
        setLeads(data.leads || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <SkeletonTable rows={5} />;

  const statusVariant = (s: string) => {
    if (s === "new") return "new" as const;
    if (s === "contacted") return "contacted" as const;
    if (s === "qualified") return "qualified" as const;
    return "disqualified" as const;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-14">
        <thead className="text-12 text-text-secondary uppercase tracking-wider border-b border-navy-border">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Business</th>
            <th className="px-4 py-3 text-left font-medium">Category</th>
            <th className="px-4 py-3 text-left font-medium">City</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-border">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-navy-surface2 transition-colors">
              <td className="px-4 py-3">
                <Link href={`/dashboard/leads/${lead.id}`} className="text-cobalt hover:underline">
                  {lead.businessName}
                </Link>
              </td>
              <td className="px-4 py-3 text-text-secondary">{lead.category}</td>
              <td className="px-4 py-3 text-text-secondary">{lead.city}</td>
              <td className="px-4 py-3">
                <Pill variant={statusVariant(lead.status)}>{lead.status}</Pill>
              </td>
              <td className="px-4 py-3 font-mono text-text-secondary">
                {lead.googleRating ? lead.googleRating.toFixed(1) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {leads.length === 0 && (
        <div className="text-center py-8 text-text-secondary text-14">
          No leads yet. <Link href="/dashboard/leads" className="text-cobalt hover:underline">Run your first scan</Link>.
        </div>
      )}
    </div>
  );
}
