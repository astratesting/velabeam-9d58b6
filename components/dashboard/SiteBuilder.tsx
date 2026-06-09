"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { TemplateGallery } from "./TemplateGallery";
import { SiteForm, type SiteFormData } from "./SiteForm";
import { SitePreview } from "./SitePreview";
import type { GeneratedSite } from "@/lib/generator/mockGenerator";

interface SiteBuilderProps {
  initialData?: Partial<SiteFormData & { templateId: string; siteId?: string; content?: GeneratedSite }>;
  onPublish?: (data: { templateId: string; formData: SiteFormData; content: GeneratedSite }) => Promise<void>;
  onRegenerate?: (templateId: string, formData: SiteFormData) => Promise<GeneratedSite>;
  publishing?: boolean;
}

export function SiteBuilder({ initialData, onPublish, onRegenerate, publishing }: SiteBuilderProps) {
  const [templateId, setTemplateId] = useState<string>(initialData?.templateId || "");
  const [formData, setFormData] = useState<SiteFormData>({
    businessName: initialData?.businessName || "",
    tagline: initialData?.tagline || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    hours: initialData?.hours || "",
    services: initialData?.services || "",
    about: initialData?.about || "",
    primaryColor: initialData?.primaryColor || "#2D5BFF",
  });
  const [content, setContent] = useState<GeneratedSite | null>(initialData?.content || null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Debounced auto-generate preview on form changes
  const debouncedGenerate = useCallback(
    (template: string, data: SiteFormData) => {
      if (!template || !data.businessName) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`/api/sites/generate-placeholder`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ templateId: template, ...data }),
          });
          if (res.ok) {
            const result = await res.json();
            setContent(result);
            setLastSaved("just now");
          }
        } catch {
          // Silently fail on preview generation
        }
      }, 400);
    },
    []
  );

  // Trigger on template change or form data change
  useEffect(() => {
    if (templateId && formData.businessName) {
      debouncedGenerate(templateId, formData);
    }
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [templateId, formData, debouncedGenerate]);

  const handleTemplateSelect = (id: string) => {
    setTemplateId(id);
  };

  const handleRegenerate = async () => {
    if (!templateId) return;
    if (onRegenerate) {
      const result = await onRegenerate(templateId, formData);
      setContent(result);
    }
  };

  const handlePublish = async () => {
    if (!templateId || !content || !onPublish) return;
    await onPublish({ templateId, formData, content });
  };

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Left: Template gallery */}
      <div className="w-80 border-r border-navy-border overflow-y-auto p-4 bg-navy-base">
        <TemplateGallery selected={templateId} onSelect={handleTemplateSelect} />
      </div>

      {/* Center: Form */}
      <div className="w-[380px] border-r border-navy-border overflow-y-auto p-4 bg-navy-base">
        <h3 className="text-13 font-medium text-text-secondary uppercase tracking-wider mb-4">Business Details</h3>
        <SiteForm data={formData} onChange={setFormData} />
      </div>

      {/* Right: Preview */}
      <div className="flex-1 bg-navy-base">
        <SitePreview
          content={content}
          onPublish={onPublish ? handlePublish : undefined}
          onRegenerate={onRegenerate ? handleRegenerate : undefined}
          publishing={publishing}
          lastSaved={lastSaved}
        />
      </div>
    </div>
  );
}

