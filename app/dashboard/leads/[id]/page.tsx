"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ArrowLeft, MapPin, Phone, Star } from "lucide-react";
import Link from "next/link";

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

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  const loadLead = useCallback(async () => {
    try {
      const res = await fetch(`/api/leads/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setLead(data.lead);
        setActivities(data.activities || []);
        setNotes(data.lead.notes || "");
      } else {
        router.push("/dashboard/leads");
      }
    } catch {
      router.push("/dashboard/leads");
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => { loadLead(); }, [loadLead]);

  const handleStatusChange = async (status: string) => {
    if (!lead) return;
    await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLead({ ...lead, status });
    loadLead();
  };

  const handleSaveNotes = async () => {
    if (!lead) return;
    await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
  };

  if (loading || !lead) {
    return <div className="space-y-4"><div className="h-48 bg-navy-surface2 rounded animate-pulse" /></div>;
  }

  const statusVariant = (s: string) => {
    if (s === "new") return "new" as const;
    if (s === "contacted") return "contacted" as const;
    if (s === "qualified") return "qualified" as const;
    return "disqualified" as const;
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/leads" className="text-text-secondary hover:text-text-primary">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-24 font-semibold text-text-primary font-sans">{lead.businessName}</h1>
        <Pill variant={statusVariant(lead.status)}>{lead.status}</Pill>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-14 text-text-secondary">
              <MapPin size={14} strokeWidth={1.5} />
              <span>{lead.address}, {lead.city}, {lead.state}</span>
            </div>
            {lead.phone && (
              <div className="flex items-center gap-2 text-14 text-text-secondary">
                <Phone size={14} strokeWidth={1.5} />
                <span className="font-mono">{lead.phone}</span>
              </div>
            )}
            {lead.googleRating && (
              <div className="flex items-center gap-2 text-14 text-text-secondary">
                <Star size={14} strokeWidth={1.5} />
                <span className="font-mono">{lead.googleRating.toFixed(1)}</span>
                <span>({lead.reviewCount} reviews)</span>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <p className="text-14 text-text-secondary">Category: <span className="text-text-primary">{lead.category}</span></p>
            <p className="text-14 text-text-secondary">Has website: {lead.hasWebsite ? <span className="text-green-accent">Yes</span> : <span className="text-amber-accent">No</span>}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-6 pt-4 border-t border-navy-border">
          <Button onClick={() => router.push(`/dashboard/sites/new?leadId=${lead.id}`)}>Generate site</Button>
          {lead.status === "new" && <Button variant="outline" onClick={() => handleStatusChange("contacted")}>Mark contacted</Button>}
          {lead.status === "contacted" && (
            <>
              <Button variant="ghost" onClick={() => handleStatusChange("qualified")}>Qualify</Button>
              <Button variant="ghost" onClick={() => handleStatusChange("disqualified")}>Disqualify</Button>
            </>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-16 font-semibold text-text-primary font-sans mb-3">Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={handleSaveNotes}
          placeholder="Add notes about this lead..."
          className="w-full min-h-[100px] px-3 py-2 rounded-8 border border-navy-border bg-navy-base text-text-primary text-14 placeholder:text-text-secondary/50 resize-y focus:outline-none focus:ring-2 focus:ring-cobalt"
        />
      </Card>

      <Card>
        <h2 className="text-16 font-semibold text-text-primary font-sans mb-4">Activity Log</h2>
        <div className="space-y-2">
          {activities.map((a) => (
            <div key={a.id} className="flex items-start gap-2 text-13 font-mono">
              <span className="text-text-secondary whitespace-nowrap">
                [{new Date(a.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}]
              </span>
              <span className="text-text-primary">{a.message}</span>
            </div>
          ))}
          {activities.length === 0 && <p className="text-13 text-text-secondary">No activity recorded.</p>}
        </div>
      </Card>
    </div>
  );
}
