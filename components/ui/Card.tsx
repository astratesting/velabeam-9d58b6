import { type HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = "md", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "bg-navy-surface1 border border-navy-border rounded-8",
          {
            "": padding === "none",
            "p-3": padding === "sm",
            "p-4": padding === "md",
            "p-6": padding === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export { Card, type CardProps };
