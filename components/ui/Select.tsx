"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { clsx } from "clsx";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-13 font-medium text-text-secondary">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            "h-11 px-3 rounded-8 border bg-navy-base text-text-primary text-14",
            "focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-1 focus:ring-offset-navy-base",
            "transition-all duration-150",
            error ? "border-red-accent" : "border-navy-border",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-12 text-red-accent">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
export { Select, type SelectProps };
