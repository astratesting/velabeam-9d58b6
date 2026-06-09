"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function SiteEditPage() {
  const params = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<Partial<SiteFormDataType & { templateId: string; content: GeneratedSite }>>({});
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadSite = useCallback(async () => {
    try {
      const res = await fetch(`/api/sites/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        const site = data.site;
        let content: GeneratedSite | undefined;
        try { content = JSON.parse(site.content); } catch { /* empty */ }
        setInitialData({
          businessName: site.businessName,
          templateId: site.templateId,
          content,
        });
      } else {
        router.push("/dashboard/sites");
      }
    } catch {
      router.push("/dashboard/sites");
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => { loadSite(); }, [loadSite]);

  const handlePublish = async ({ templateId, formData, content }: { templateId: string; formData: SiteFormDataType; content: GeneratedSite }) => {
    setPublishing(true);
    try {
      const res = await fetch(`/api/sites/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "live",
          content: JSON.stringify(content),
          theme: JSON.stringify(content.theme),
        }),
      });
      if (res.ok) {
        setToast("Site republished");
      }
    } catch {
      setToast("Failed to publish");
    } finally {
      setPublishing(false);
    }
  };

  const handleRegenerate = async (templateId: string, formData: SiteFormDataType): Promise<GeneratedSite> => {
    const res = await fetch(`/api/sites/${params.id}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId, ...formData }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.content;
    }
    throw new Error("Generation failed");
  };

  if (loading) {
    return <div className="h-[calc(100vh-56px)] bg-navy-surface2 rounded animate-pulse" />;
  }

  return (
    <div className="-m-6">
      <SiteBuilder
        initialData={initialData}
        onPublish={handlePublish}
        onRegenerate={handleRegenerate}
        publishing={publishing}
      />
      {toast && (
        <Toast
          message={toast}
          variant={toast.includes("republished") ? "success" : "error"}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
