"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

export function PricingCards() {
  const [annual, setAnnual] = useState(false);

  const tiers = [
    {
      name: "Starter",
      price: annual ? 39 : 49,
      description: "For solo operators getting started",
      features: [
        "50 lead scans/month",
        "10 site generations/month",
        "5 active sites",
        "Basic templates",
        "Email support",
      ],
      cta: "Start free trial",
      highlighted: false,
    },
    {
      name: "Pro",
      price: annual ? 79 : 99,
      description: "For growing freelancers and small shops",
      features: [
        "200 lead scans/month",
        "50 site generations/month",
        "25 active sites",
        "All templates",
        "Priority support",
        "Custom domains",
        "API access",
      ],
      cta: "Start free trial",
      highlighted: true,
    },
    {
      name: "Agency",
      price: annual ? 159 : 199,
      description: "For agencies managing multiple clients",
      features: [
        "Unlimited lead scans",
        "Unlimited site generations",
        "100 active sites",
        "All templates",
        "Dedicated support",
        "Custom domains",
        "API access",
        "Multi-user workspace",
      ],
      cta: "Start free trial",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-navy-surface1">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-32 font-display font-bold text-text-primary text-center mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-16 text-text-secondary text-center mb-8">
          Prices in USD. Cancel anytime.
        </p>

        {/* Annual toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-14 ${!annual ? "text-text-primary" : "text-text-secondary"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-11 h-6 rounded-full transition-colors ${annual ? "bg-cobalt" : "bg-navy-border"}`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${annual ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
          <span className={`text-14 ${annual ? "text-text-primary" : "text-text-secondary"}`}>
            Annual <span className="text-green-accent text-12">Save 20%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-8 p-6 border ${
                tier.highlighted
                  ? "border-cobalt bg-navy-base"
                  : "border-navy-border bg-navy-base"
              }`}
            >
              <h3 className="text-20 font-semibold text-text-primary font-sans">{tier.name}</h3>
              <p className="text-14 text-text-secondary mt-1 mb-4">{tier.description}</p>
              <div className="mb-6">
                <span className="text-44 font-mono font-bold text-text-primary">${tier.price}</span>
                <span className="text-14 text-text-secondary">/mo</span>
              </div>
              <ul className="space-y-3 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-14 text-text-secondary">
                    <Check size={16} className="text-green-accent shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block">
                <Button
                  variant={tier.highlighted ? "primary" : "outline"}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison matrix */}
        <div className="mt-16 overflow-x-auto">
          <table className="w-full text-14 max-w-3xl mx-auto">
            <thead>
              <tr className="border-b border-navy-border">
                <th className="text-left py-3 text-text-secondary font-medium">Feature</th>
                <th className="text-center py-3 text-text-secondary font-medium">Starter</th>
                <th className="text-center py-3 text-text-primary font-medium">Pro</th>
                <th className="text-center py-3 text-text-secondary font-medium">Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-border/50">
              {[
                { feature: "Lead scans", starter: "50/mo", pro: "200/mo", agency: "Unlimited" },
                { feature: "Site generations", starter: "10/mo", pro: "50/mo", agency: "Unlimited" },
                { feature: "Active sites", starter: "5", pro: "25", agency: "100" },
                { feature: "Templates", starter: "Basic", pro: "All", agency: "All" },
                { feature: "Custom domains", starter: "—", pro: "✓", agency: "✓" },
                { feature: "API access", starter: "—", pro: "✓", agency: "✓" },
                { feature: "Multi-user", starter: "—", pro: "—", agency: "✓" },
                { feature: "Priority support", starter: "—", pro: "✓", agency: "✓" },
              ].map((row) => (
                <tr key={row.feature}>
                  <td className="py-3 text-text-primary">{row.feature}</td>
                  <td className="py-3 text-center text-text-secondary font-mono">{row.starter}</td>
                  <td className="py-3 text-center text-text-primary font-mono">{row.pro}</td>
                  <td className="py-3 text-center text-text-secondary font-mono">{row.agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
