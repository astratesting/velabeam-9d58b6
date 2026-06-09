"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-16 bg-navy-base/95 backdrop-blur-sm border-b border-navy-border">
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-20 font-display font-bold text-cobalt flex items-center">
          Vela<span className="text-text-primary">Beam</span>
          <span className="ml-1 w-1.5 h-1.5 rounded-full bg-cobalt" />
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-14 text-text-secondary hover:text-text-primary transition-colors">Product</Link>
          <Link href="/pricing" className="text-14 text-text-secondary hover:text-text-primary transition-colors">Pricing</Link>
          <Link href="/#faq" className="text-14 text-text-secondary hover:text-text-primary transition-colors">FAQ</Link>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Start free trial</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-text-secondary" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-base border-b border-navy-border px-6 py-4 space-y-3">
          <Link href="/#features" className="block text-14 text-text-secondary hover:text-text-primary">Product</Link>
          <Link href="/pricing" className="block text-14 text-text-secondary hover:text-text-primary">Pricing</Link>
          <Link href="/#faq" className="block text-14 text-text-secondary hover:text-text-primary">FAQ</Link>
          <div className="flex gap-3 pt-2">
            <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link href="/register"><Button size="sm">Start free trial</Button></Link>
          </div>
        </div>
      )}
    </nav>
  );
}
