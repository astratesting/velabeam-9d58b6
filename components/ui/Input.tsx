"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-13 font-medium text-text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "h-11 px-3 rounded-8 border bg-navy-base text-text-primary text-14",
            "placeholder:text-text-secondary/50",
            "focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-1 focus:ring-offset-navy-base",
            "transition-all duration-150",
            error ? "border-red-accent" : "border-navy-border",
            className
          )}
          {...props}
        />
        {error && <p className="text-12 text-red-accent">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input, type InputProps };
