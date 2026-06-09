"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SiteBuilder } from "@/components/dashboard/SiteBuilder";
import { Toast } from "@/components/ui/Toast";
import type { GeneratedSite } from "@/lib/generator/mockGenerator";

interface SiteFormDataType {
  businessName: string;
  tagline: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  hours: string;
  services: string;
  about: string;
  primaryColor: string;
}

function NewSiteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const leadId = searchParams.get("leadId");
  const [initialData, setInitialData] = useState<Partial<SiteFormDataType & { templateId: string }>>({});
  const [loading, setLoading] = useState(!!leadId);
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadLead = useCallback(async () => {
    if (!leadId) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`);
      if (res.ok) {
        const data = await res.json();
        const lead = data.lead;
        setInitialData({
          businessName: lead.businessName,
          phone: lead.phone || "",
          address: lead.address,
          city: lead.city,
          state: lead.state,
        });
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  useEffect(() => { loadLead(); }, [loadLead]);

  const handlePublish = async ({ templateId, formData, content }: { templateId: string; formData: SiteFormDataType; content: GeneratedSite }) => {
    setPublishing(true);
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: leadId || undefined,
          templateId,
          ...formData,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setToast(`Deployed · ${data.previewUrl}`);
        setTimeout(() => router.push("/dashboard/sites"), 1500);
      } else {
        const err = await res.json();
        setToast(err.error || "Failed to publish");
      }
    } catch {
      setToast("Failed to publish");
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return <div className="h-[calc(100vh-56px)] bg-navy-surface2 rounded animate-pulse" />;
  }

  return (
    <div className="-m-6">
      <SiteBuilder
        initialData={initialData}
        onPublish={handlePublish}
        publishing={publishing}
      />
      {toast && (
        <Toast
          message={toast}
          variant={toast.includes("Deployed") ? "success" : "error"}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default function NewSitePage() {
  return (
    <Suspense fallback={<div className="h-[calc(100vh-56px)] bg-navy-surface2 rounded animate-pulse" />}>
      <NewSiteContent />
    </Suspense>
  );
}
