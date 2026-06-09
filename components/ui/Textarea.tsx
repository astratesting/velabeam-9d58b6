"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-13 font-medium text-text-secondary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            "min-h-[80px] px-3 py-2 rounded-8 border bg-navy-base text-text-primary text-14",
            "placeholder:text-text-secondary/50 resize-y",
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

Textarea.displayName = "Textarea";
export { Textarea, type TextareaProps };
