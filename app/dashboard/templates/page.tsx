"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  theme: { primary: string; font: string };
}

export default function TemplatesPage() {
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
      <div className="space-y-6">
        <h1 className="text-24 font-semibold text-text-primary font-sans">Templates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-64 bg-navy-surface2 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-24 font-semibold text-text-primary font-sans">Templates</h1>
      <p className="text-14 text-text-secondary">Industry-specific templates for generating sites.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => (
          <Card key={t.id} className="overflow-hidden">
            <div
              className="w-full h-40 bg-navy-base rounded-t flex items-center justify-center overflow-hidden"
              dangerouslySetInnerHTML={{ __html: t.thumbnail }}
            />
            <div className="p-4">
              <h3 className="text-16 font-semibold text-text-primary font-sans">{t.name}</h3>
              <p className="text-13 text-text-secondary mt-1 mb-3">
                Template ID: <span className="font-mono">{t.id}</span>
              </p>
              <Link href={`/dashboard/sites/new?template=${t.id}`}>
                <Button size="sm" variant="outline">Use Template</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
