"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LeadScanForm } from "@/components/dashboard/LeadScanForm";
import { LeadTable } from "@/components/dashboard/LeadTable";
import { LeadDetailDrawer } from "@/components/dashboard/LeadDetailDrawer";
import { Toast } from "@/components/ui/Toast";

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

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleScan = useCallback(async (data: { area: string; radius: number; categories: string[] }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const result = await res.json();
        setLeads(result.leads);
        setTotal(result.count);
        setPage(1);
        setToast(`Found ${result.count} leads in ${data.area}`);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const res = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      if (selectedLead?.id === id) setSelectedLead((prev) => prev ? { ...prev, status } : null);
    }
  };

  const handleGenerateSite = (lead: Lead) => {
    router.push(`/dashboard/sites/new?leadId=${lead.id}`);
  };

  const handleSave = async (id: string, saved: boolean) => {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ saved }),
    });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, saved } : l)));
    if (selectedLead?.id === id) setSelectedLead((prev) => prev ? { ...prev, saved } : null);
  };

  // Load leads on mount if none yet
  useEffect(() => {
    if (leads.length === 0) {
      setLoading(true);
      fetch("/api/leads?limit=25")
        .then((r) => r.json())
        .then((data) => {
          setLeads(data.leads);
          setTotal(data.total);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      <h1 className="text-24 font-semibold text-text-primary font-sans">Lead Discovery</h1>

      <LeadScanForm onScan={handleScan} loading={loading} />

      <LeadTable
        leads={leads}
        loading={loading}
        page={page}
        total={total}
        onPageChange={setPage}
        onStatusChange={handleStatusChange}
        onGenerateSite={handleGenerateSite}
        onRowClick={setSelectedLead}
      />

      <LeadDetailDrawer
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onStatusChange={handleStatusChange}
        onGenerate={handleGenerateSite}
        onSave={handleSave}
      />

      {toast && (
        <Toast message={toast} variant="success" onClose={() => setToast(null)} />
      )}
    </div>
  );
}
