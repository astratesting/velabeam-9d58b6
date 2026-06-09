"use client";

import { clsx } from "clsx";
import { Monitor, Tablet, Smartphone } from "lucide-react";

type Device = "desktop" | "tablet" | "mobile";

interface DeviceToggleProps {
  value: Device;
  onChange: (device: Device) => void;
}

const devices: { id: Device; icon: typeof Monitor; width: number }[] = [
  { id: "desktop", icon: Monitor, width: 1280 },
  { id: "tablet", icon: Tablet, width: 768 },
  { id: "mobile", icon: Smartphone, width: 390 },
];

export function DeviceToggle({ value, onChange }: DeviceToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-navy-surface1 border border-navy-border rounded-8 p-1">
      {devices.map((d) => (
        <button
          key={d.id}
          onClick={() => onChange(d.id)}
          className={clsx(
            "p-1.5 rounded transition-colors",
            value === d.id ? "bg-cobalt/20 text-cobalt" : "text-text-secondary hover:text-text-primary"
          )}
          title={d.id}
        >
          <d.icon size={16} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}

export function getDeviceWidth(device: Device): number {
  return devices.find((d) => d.id === device)?.width || 1280;
}
