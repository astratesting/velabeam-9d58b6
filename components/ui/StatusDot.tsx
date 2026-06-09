import { clsx } from "clsx";

interface StatusDotProps {
  status: "live" | "building" | "draft" | "error" | "stale";
  size?: "sm" | "md";
}

const statusColors: Record<string, string> = {
  live: "bg-green-accent",
  building: "bg-cobalt",
  draft: "bg-slate-cool",
  error: "bg-red-accent",
  stale: "bg-amber-accent",
};

export function StatusDot({ status, size = "sm" }: StatusDotProps) {
  return (
    <span
      className={clsx(
        "inline-block rounded-full",
        statusColors[status] || "bg-slate-cool",
        size === "sm" ? "w-2 h-2" : "w-3 h-3",
        status === "live" && "animate-pulse-live"
      )}
    />
  );
}
