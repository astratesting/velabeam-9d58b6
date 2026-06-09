"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "inline-flex items-center justify-center font-sans font-medium rounded-8 transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-2 focus:ring-offset-navy-base",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-cobalt text-white hover:bg-cobalt-hover active:bg-cobalt/90": variant === "primary",
            "bg-transparent text-text-secondary hover:text-text-primary hover:bg-navy-surface2": variant === "ghost",
            "bg-red-accent text-white hover:bg-red-accent/90": variant === "danger",
            "border border-navy-border text-text-primary hover:bg-navy-surface2": variant === "outline",
          },
          {
            "text-12 px-3 py-1.5 gap-1.5": size === "sm",
            "text-14 px-4 py-2 gap-2": size === "md",
            "text-16 px-6 py-3 gap-2": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button, type ButtonProps };
