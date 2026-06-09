import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ContourLines } from "./harbor/ContourLines";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <ContourLines />
      <div className="relative max-w-[1200px] mx-auto px-6 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="text-12 font-mono uppercase tracking-wider text-cobalt mb-4">
              AI-Powered Pipeline for Local-Business Sites
            </p>
            <h1 className="text-56 font-display font-bold text-text-primary leading-tight mb-6">
              Find the businesses without a website. Ship theirs by lunch.
            </h1>
            <p className="text-18 text-text-secondary max-w-[56ch] mb-8 font-sans">
              VelaBeam scans your target area, identifies local businesses with no web presence, and generates a polished, industry-specific site in minutes — not weeks.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/register">
                <Button size="lg">Start a lead scan</Button>
              </Link>
              <Link href="#pipeline-demo">
                <Button size="lg" variant="ghost">See it run</Button>
              </Link>
            </div>
          </div>

          {/* Right: Console mockup */}
          <div className="bg-navy-surface1 border border-navy-border rounded-8 p-4 overflow-hidden">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-navy-border">
              <div className="w-2.5 h-2.5 rounded-full bg-red-accent/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-accent/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-accent/50" />
              <span className="ml-2 text-12 text-text-secondary font-mono">Lead Finder</span>
            </div>
            <div className="font-mono text-13 space-y-3">
              <div className="text-text-secondary">
                <span className="text-cobalt">&gt;</span> area: <span className="text-green-accent">&quot;Austin, TX&quot;</span> · radius: <span className="text-amber-accent">15mi</span> · filter: <span className="text-green-accent">&quot;no_site&quot;</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-12">
                  <thead className="text-text-secondary">
                    <tr>
                      <th className="text-left py-1 pr-3">Business</th>
                      <th className="text-left py-1 pr-3">Category</th>
                      <th className="text-left py-1 pr-3">Rating</th>
                      <th className="text-left py-1">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-primary">
                    {[
                      { name: "TideWell Plumbing", cat: "Plumber", rating: "4.6", status: "New" },
                      { name: "Lone Star Cuts", cat: "Salon", rating: "4.8", status: "New" },
                      { name: "Barton Springs Auto", cat: "Auto Repair", rating: "4.1", status: "New" },
                      { name: "Hill Country Landscaping", cat: "Landscaper", rating: "4.4", status: "New" },
                      { name: "Taqueria El Sol", cat: "Restaurant", rating: "4.5", status: "New" },
                    ].map((row) => (
                      <tr key={row.name} className="border-t border-navy-border/50">
                        <td className="py-1.5 pr-3">{row.name}</td>
                        <td className="py-1.5 pr-3 text-text-secondary">{row.cat}</td>
                        <td className="py-1.5 pr-3 text-amber-accent">{row.rating}</td>
                        <td className="py-1.5">
                          <span className="px-1.5 py-0.5 rounded text-10 bg-cobalt/15 text-cobalt border border-cobalt/30">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-text-secondary pt-1">
                <span className="text-cobalt">&gt;</span> Generating preview for <span className="text-text-primary">TideWell Plumbing</span>...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
