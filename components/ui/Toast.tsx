"use client";

import { useEffect, useState, type ReactNode } from "react";
import { clsx } from "clsx";
import { X } from "lucide-react";

interface ToastProps {
  message: ReactNode;
  variant?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, variant = "info", onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 200);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={clsx(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-8 border shadow-lg",
        "transition-all duration-200",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        {
          "bg-navy-surface2 border-green-accent/30 text-green-accent": variant === "success",
          "bg-navy-surface2 border-red-accent/30 text-red-accent": variant === "error",
          "bg-navy-surface2 border-cobalt/30 text-cobalt": variant === "info",
        }
      )}
    >
      <span className="text-14 font-sans">{message}</span>
      <button onClick={onClose} className="text-current opacity-60 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
}
