import { type ReactNode } from "react";
import { clsx } from "clsx";

interface KpiTileProps {
  label: string;
  value: string | number;
  change?: string;
  icon: ReactNode;
}

export function KpiTile({ label, value, change, icon }: KpiTileProps) {
  return (
    <div className="bg-navy-surface1 border border-navy-border rounded-8 p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-12 text-text-secondary uppercase tracking-wider">{label}</p>
          <p className="text-32 font-mono font-semibold text-text-primary mt-1 tabular-nums">
            {value}
          </p>
          {change && (
            <p className={clsx("text-12 mt-1", change.startsWith("+") ? "text-green-accent" : "text-text-secondary")}>
              {change}
            </p>
          )}
        </div>
        <div className="text-text-secondary">{icon}</div>
      </div>
    </div>
  );
}
