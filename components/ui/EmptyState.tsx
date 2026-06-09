import { type ReactNode } from "react";
import { clsx } from "clsx";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={clsx("flex flex-col items-center justify-center py-16 text-center", className)}>
      {icon && <div className="mb-4 text-text-secondary">{icon}</div>}
      <h3 className="text-16 font-semibold text-text-primary font-sans">{title}</h3>
      {description && <p className="text-14 text-text-secondary mt-1 max-w-md">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
