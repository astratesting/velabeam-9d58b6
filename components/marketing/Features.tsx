import { Radar, Globe, Wand2, Eye, Users, Layers } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Radar,
      title: "Lead Discovery",
      description: "Scan any area and find businesses with no website. Filter by category, radius, and rating.",
    },
    {
      icon: Layers,
      title: "Industry Templates",
      description: "5 purpose-built templates for common local business types. More added regularly.",
    },
    {
      icon: Wand2,
      title: "AI Site Generator",
      description: "Provide business details and get a complete, copy-written site draft in seconds.",
    },
    {
      icon: Eye,
      title: "Live Preview & Deploy",
      description: "Preview your generated site in real-time across devices. One-click publish to a live URL.",
    },
    {
      icon: Users,
      title: "Lead CRM",
      description: "Track lead status from discovery to qualified. Notes, activity logs, and status tracking built in.",
    },
    {
      icon: Globe,
      title: "Multi-tenant Workspaces",
      description: "Each agency gets an isolated workspace. Manage team access and API keys.",
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-32 font-display font-bold text-text-primary text-center mb-4">
          Everything you need to fill your pipeline
        </h2>
        <p className="text-16 text-text-secondary text-center max-w-xl mx-auto mb-12">
          From lead discovery to deployed site — one tool, one workflow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-navy-surface1 border border-navy-border rounded-8 p-6">
              <f.icon size={32} strokeWidth={1.5} className="text-cobalt mb-4" />
              <h3 className="text-18 font-semibold text-text-primary mb-2 font-sans">{f.title}</h3>
              <p className="text-14 text-text-secondary leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
