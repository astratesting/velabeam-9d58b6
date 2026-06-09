"use client";

import { type ReactNode } from "react";
import { clsx } from "clsx";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-navy-base flex items-center justify-center p-4 relative overflow-hidden">
      {/* Harbor contour lines background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path d="M0,400 Q300,350 600,400 T1200,400" fill="none" stroke="#2D5BFF" strokeWidth="1" />
        <path d="M0,420 Q300,370 600,420 T1200,420" fill="none" stroke="#2D5BFF" strokeWidth="1" />
        <path d="M0,440 Q300,390 600,440 T1200,440" fill="none" stroke="#2D5BFF" strokeWidth="1" />
        <path d="M0,380 Q300,330 600,380 T1200,380" fill="none" stroke="#2D5BFF" strokeWidth="1" />
        <path d="M0,360 Q300,310 600,360 T1200,360" fill="none" stroke="#2D5BFF" strokeWidth="1" />
        <path d="M0,500 Q300,450 600,500 T1200,500" fill="none" stroke="#5B6B8A" strokeWidth="0.5" />
        <path d="M0,520 Q300,470 600,520 T1200,520" fill="none" stroke="#5B6B8A" strokeWidth="0.5" />
        <path d="M0,300 Q300,250 600,300 T1200,300" fill="none" stroke="#5B6B8A" strokeWidth="0.5" />
        <path d="M0,320 Q300,270 600,320 T1200,320" fill="none" stroke="#5B6B8A" strokeWidth="0.5" />
      </svg>

      <div className="relative w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-24 font-display font-bold text-cobalt">
            Vela<span className="text-text-primary">Beam</span>
          </h1>
        </div>

        <div className="bg-navy-surface1 border border-navy-border rounded-8 p-6">
          <div className="mb-6">
            <h2 className="text-20 font-semibold text-text-primary font-sans">{title}</h2>
            {subtitle && <p className="text-14 text-text-secondary mt-1">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
