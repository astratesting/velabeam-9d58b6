"use client";

import { useEffect, useState } from "react";
import { X, MapPin, Phone, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { clsx } from "clsx";

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

interface Activity {
  id: string;
  type: string;
  message: string;
  createdAt: string;
}

interface LeadDetailDrawerProps {
  lead: Lead | null;
  onClose: () => void;
  onStatusChange?: (id: string, status: string) => void;
  onGenerate?: (lead: Lead) => void;
  onSave?: (id: string, saved: boolean) => void;
}

export function LeadDetailDrawer({ lead, onClose, onStatusChange, onGenerate, onSave }: LeadDetailDrawerProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notes, setNotes] = useState(lead?.notes || "");

  useEffect(() => {
    if (lead) {
      setNotes(lead.notes || "");
      fetch(`/api/leads/${lead.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.activities) setActivities(data.activities);
        })
        .catch(() => {});
    }
  }, [lead]);

  if (!lead) return null;

  const statusVariant = (s: string) => {
    if (s === "new") return "new" as const;
    if (s === "contacted") return "contacted" as const;
    if (s === "qualified") return "qualified" as const;
    return "disqualified" as const;
  };

  const handleSaveNotes = async () => {
    await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-[480px] max-w-full bg-navy-surface1 border-l border-navy-border z-50 overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-navy-surface1 border-b border-navy-border px-6 py-4 flex items-start justify-between">
          <div>
            <h2 className="text-20 font-semibold text-text-primary font-sans">{lead.businessName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Pill variant={statusVariant(lead.status)}>{lead.status}</Pill>
              <span className="text-13 text-text-secondary">{lead.category}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Business Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-14 text-text-secondary">
              <MapPin size={14} strokeWidth={1.5} />
              <span>{lead.address}, {lead.city}, {lead.state}</span>
            </div>
            {lead.phone && (
              <div className="flex items-center gap-2 text-14 text-text-secondary">
                <Phone size={14} strokeWidth={1.5} />
                <span>{lead.phone}</span>
              </div>
            )}
            {lead.googleRating && (
              <div className="flex items-center gap-2 text-14 text-text-secondary">
                <Star size={14} strokeWidth={1.5} />
                <span className="font-mono">{lead.googleRating.toFixed(1)}</span>
                <span>({lead.reviewCount} reviews)</span>
              </div>
            )}
            <div className="text-13 text-text-secondary">
              Has website: {lead.hasWebsite ? (
                <span className="text-green-accent">Yes</span>
              ) : (
                <span className="text-amber-accent">No</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => onGenerate?.(lead)}>
              Generate site
            </Button>
            <Button size="sm" variant="outline" onClick={() => onSave?.(lead.id, !lead.saved)}>
              {lead.saved ? "Unsave" : "Save"}
            </Button>
            {lead.status === "new" && (
              <Button size="sm" variant="ghost" onClick={() => onStatusChange?.(lead.id, "contacted")}>
                Mark contacted
              </Button>
            )}
            {lead.status === "contacted" && (
              <>
                <Button size="sm" variant="ghost" onClick={() => onStatusChange?.(lead.id, "qualified")}>
                  Qualify
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onStatusChange?.(lead.id, "disqualified")}>
                  Disqualify
                </Button>
              </>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="text-13 font-medium text-text-secondary block mb-1.5">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleSaveNotes}
              placeholder="Add notes about this lead..."
              className="w-full min-h-[80px] px-3 py-2 rounded-8 border border-navy-border bg-navy-base text-text-primary text-14 placeholder:text-text-secondary/50 resize-y focus:outline-none focus:ring-2 focus:ring-cobalt"
            />
          </div>

          {/* Activity Log */}
          <div>
            <h3 className="text-13 font-medium text-text-secondary mb-3">Activity</h3>
            <div className="space-y-2">
              {activities.map((a) => (
                <div key={a.id} className="flex items-start gap-2 text-13 font-mono">
                  <span className="text-text-secondary whitespace-nowrap">
                    [{new Date(a.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}]
                  </span>
                  <span className="text-text-primary">{a.message}</span>
                </div>
              ))}
              {activities.length === 0 && (
                <p className="text-13 text-text-secondary">No activity recorded.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
