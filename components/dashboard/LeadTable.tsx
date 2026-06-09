"use client";

import { useState } from "react";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { SkeletonTable } from "@/components/ui/Skeleton";

interface Lead {
  id: string;
  businessName: string;
  category: string;
  address: string;
  city: string;
  state: string;
  phone: string | null;
  hasWebsite: boolean;
  googleRating: number | null;
  reviewCount: number | null;
  lat: number | null;
  lng: number | null;
  status: string;
  saved: boolean;
  notes: string | null;
}

interface LeadTableProps {
  leads: Lead[];
  loading?: boolean;
  page?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onStatusChange?: (id: string, status: string) => void;
  onGenerateSite?: (lead: Lead) => void;
  onRowClick?: (lead: Lead) => void;
}

const statusVariant = (s: string) => {
  if (s === "new") return "new" as const;
  if (s === "contacted") return "contacted" as const;
  if (s === "qualified") return "qualified" as const;
  return "disqualified" as const;
};

export function LeadTable({
  leads,
  loading,
  page = 1,
  total = 0,
  onPageChange,
  onStatusChange,
  onGenerateSite,
  onRowClick,
}: LeadTableProps) {
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      await onStatusChange?.(id, status);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <SkeletonTable rows={8} />;

  const totalPages = Math.ceil(total / 25);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-14">
          <thead className="text-12 text-text-secondary uppercase tracking-wider border-b border-navy-border">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Business</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-left font-medium">Address</th>
              <th className="px-4 py-3 text-left font-medium">City</th>
              <th className="px-4 py-3 text-left font-medium">Phone</th>
              <th className="px-4 py-3 text-left font-medium">Has Site</th>
              <th className="px-4 py-3 text-left font-medium">Rating</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-border">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-navy-surface2 transition-colors cursor-pointer"
                onClick={() => onRowClick?.(lead)}
              >
                <td className="px-4 py-3 text-text-primary font-medium">{lead.businessName}</td>
                <td className="px-4 py-3 text-text-secondary">{lead.category}</td>
                <td className="px-4 py-3 text-text-secondary">{lead.address}</td>
                <td className="px-4 py-3 text-text-secondary">{lead.city}</td>
                <td className="px-4 py-3 text-text-secondary font-mono">{lead.phone || "—"}</td>
                <td className="px-4 py-3 text-text-secondary">{lead.hasWebsite ? "✓" : "—"}</td>
                <td className="px-4 py-3 font-mono text-text-secondary">
                  {lead.googleRating ? lead.googleRating.toFixed(1) : "—"}
                  {lead.reviewCount ? ` (${lead.reviewCount})` : ""}
                </td>
                <td className="px-4 py-3">
                  <Pill variant={statusVariant(lead.status)}>{lead.status}</Pill>
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      loading={actionLoading === lead.id}
                      onClick={() => onGenerateSite?.(lead)}
                    >
                      Generate
                    </Button>
                    {lead.status === "new" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange(lead.id, "contacted")}
                      >
                        Mark contacted
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <div className="text-center py-12 text-text-secondary text-14">
          No leads found. Run a scan to discover businesses.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-navy-border">
          <span className="text-13 text-text-secondary">
            Showing {(page - 1) * 25 + 1}-{Math.min(page * 25, total)} of {total}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
