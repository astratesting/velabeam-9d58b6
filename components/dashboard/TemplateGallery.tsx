"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
}

interface TemplateGalleryProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function TemplateGallery({ selected, onSelect }: TemplateGalleryProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/templates")
      .then((r) => r.json())
      .then((data) => {
        setTemplates(data.templates || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-navy-surface2 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-13 font-medium text-text-secondary uppercase tracking-wider px-1">Templates</h3>
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={clsx(
            "w-full text-left p-3 rounded-8 border transition-all duration-150",
            selected === t.id
              ? "border-cobalt bg-cobalt/10"
              : "border-navy-border bg-navy-surface1 hover:bg-navy-surface2"
          )}
        >
          <div
            className="w-full h-16 rounded mb-2 overflow-hidden bg-navy-base flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: t.thumbnail }}
          />
          <span className="text-13 text-text-primary font-medium">{t.name}</span>
        </button>
      ))}
    </div>
  );
}
