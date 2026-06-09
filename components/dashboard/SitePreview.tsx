"use client";

import { useState } from "react";
import { DeviceToggle, getDeviceWidth } from "./DeviceToggle";
import { SiteRenderer } from "./SiteRenderer";
import { Button } from "@/components/ui/Button";
import type { GeneratedSite } from "@/lib/generator/mockGenerator";

type Device = "desktop" | "tablet" | "mobile";

interface SitePreviewProps {
  content: GeneratedSite | null;
  onPublish?: () => void;
  onRegenerate?: () => void;
  publishing?: boolean;
  lastSaved?: string | null;
}

export function SitePreview({ content, onPublish, onRegenerate, publishing, lastSaved }: SitePreviewProps) {
  const [device, setDevice] = useState<Device>("desktop");
  const width = getDeviceWidth(device);

  return (
    <div className="h-full flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-navy-border bg-navy-surface1">
        <div className="flex items-center gap-3">
          <DeviceToggle value={device} onChange={setDevice} />
          {lastSaved && (
            <span className="text-12 text-text-secondary">auto-saved {lastSaved}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onRegenerate && (
            <Button size="sm" variant="ghost" onClick={onRegenerate}>
              Regenerate
            </Button>
          )}
          {onPublish && (
            <Button size="sm" loading={publishing} onClick={onPublish}>
              Publish
            </Button>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-auto bg-navy-base flex justify-center p-4">
        <div
          className="bg-navy-base shadow-lg rounded-8 overflow-hidden transition-all duration-200"
          style={{ width: `${width}px`, maxWidth: "100%" }}
        >
          {content ? (
            <SiteRenderer content={content} />
          ) : (
            <div className="flex items-center justify-center h-96 text-text-secondary text-14">
              Select a template and fill in business details to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
