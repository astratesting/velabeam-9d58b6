"use client";

import { useEffect, useState, useCallback } from "react";
import { SitesTable } from "@/components/dashboard/SitesTable";
import { Toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Site {
  id: string;
  businessName: string;
  templateId: string;
  subdomain: string;
  status: string;
  publishedAt: string | null;
  deployCount: number;
  updatedAt: string;
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const loadSites = useCallback(async () => {
    try {
      const res = await fetch("/api/sites?limit=50");
      if (res.ok) {
        const data = await res.json();
        setSites(data.sites);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadSites(); }, [loadSites]);

  const handleUnpublish = async (id: string) => {
    const res = await fetch(`/api/sites/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "draft" }),
    });
    if (res.ok) {
      setSites((prev) => prev.map((s) => (s.id === id ? { ...s, status: "draft" } : s)));
      setToast("Site unpublished");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/sites/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSites((prev) => prev.filter((s) => s.id !== id));
      setToast("Site deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-24 font-semibold text-text-primary font-sans">Sites</h1>
        <Link href="/dashboard/sites/new">
          <Button>New Site</Button>
        </Link>
      </div>

      <SitesTable
        sites={sites}
        loading={loading}
        onUnpublish={handleUnpublish}
        onDelete={handleDelete}
      />

      {toast && <Toast message={toast} variant="success" onClose={() => setToast(null)} />}
    </div>
  );
}
