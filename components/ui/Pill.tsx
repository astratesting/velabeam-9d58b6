import { clsx } from "clsx";

interface PillProps {
  variant: "live" | "building" | "draft" | "error" | "stale" | "new" | "contacted" | "qualified" | "disqualified";
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  live: "bg-green-accent/15 text-green-accent border-green-accent/30",
  building: "bg-cobalt/15 text-cobalt border-cobalt/30",
  draft: "bg-slate-cool/15 text-slate-cool border-slate-cool/30",
  error: "bg-red-accent/15 text-red-accent border-red-accent/30",
  stale: "bg-amber-accent/15 text-amber-accent border-amber-accent/30",
  new: "bg-cobalt/15 text-cobalt border-cobalt/30",
  contacted: "bg-amber-accent/15 text-amber-accent border-amber-accent/30",
  qualified: "bg-green-accent/15 text-green-accent border-green-accent/30",
  disqualified: "bg-red-accent/15 text-red-accent border-red-accent/30",
};

export function Pill({ variant, children }: PillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded-full text-12 font-medium border",
        variantStyles[variant]
      )}
    >
      {variant === "live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-accent mr-1.5 animate-pulse-live" />
      )}
      {children}
    </span>
  );
}
