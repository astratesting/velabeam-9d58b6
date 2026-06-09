"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

const faqs = [
  {
    q: "What exactly does VelaBeam do?",
    a: "VelaBeam scans a target area for local businesses that don't have a website, lets you pick a lead, generate an industry-specific site using AI, and publish it to a live URL — all in one workspace.",
  },
  {
    q: "Do I need to know how to code?",
    a: "VelaBeam is built for web developers and agencies who already know HTML/CSS. The generated sites are professional first drafts you can refine — not drag-and-drop templates. You control the output.",
  },
  {
    q: "Is the lead data real?",
    a: "In this version, lead data is generated from mock engines seeded by location. We're integrating Google Places and Yelp Fusion for real business data. The seam is clearly marked in the codebase.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes. Pro and Agency plans support custom domains. You can publish sites to your own domain or use the default {subdomain}.velabeam.app URLs for previews.",
  },
  {
    q: "What happens when I cancel?",
    a: "You can cancel anytime. Your sites remain accessible until the end of your billing period. Export your data at any time from the dashboard.",
  },
  {
    q: "How does the AI generation work?",
    a: "When you select a template and provide business details, VelaBeam generates site content using structured prompts. The mock path works without any API keys; connect an OpenAI key for richer, contextual copy.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-navy-surface1">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="text-32 font-display font-bold text-text-primary text-center mb-12">
          Frequently asked questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-navy-border rounded-8 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-navy-surface2 transition-colors"
              >
                <span className="text-14 font-medium text-text-primary pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={clsx(
                    "text-text-secondary shrink-0 transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4">
                  <p className="text-14 text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
