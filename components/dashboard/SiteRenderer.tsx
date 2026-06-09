"use client";

import type { GeneratedSite } from "@/lib/generator/mockGenerator";

interface SiteRendererProps {
  content: GeneratedSite;
}

export function SiteRenderer({ content }: SiteRendererProps) {
  const theme = content.theme;
  const sections = content.sections;

  const getIcon = (icon: string) => {
    const icons: Record<string, string> = {
      wrench: "🔧", droplets: "💧", flame: "🔥", settings: "⚙️",
      zap: "⚡", cpu: "💻", sun: "☀️", shield: "🛡️",
      scissors: "✂️", palette: "🎨", sparkles: "✨", star: "⭐",
      utensils: "🍽️", package: "📦", calendar: "📅", users: "👥",
      disc: "💿", scan: "🔍", leaf: "🌿", layers: "📐",
      flower: "🌸", clipboard: "📋", refresh: "🔄",
    };
    return icons[icon] || "•";
  };

  const renderSection = (section: { type: string; props: Record<string, unknown> }, index: number) => {
    switch (section.type) {
      case "hero":
        return (
          <section
            key={index}
            className="px-6 py-16 text-center"
            style={{ background: `linear-gradient(135deg, ${theme.primary}22 0%, #0B1220 100%)` }}
          >
            <h1 className="text-44 font-display font-bold text-text-primary mb-4">
              {String(section.props.headline || "")}
            </h1>
            <p className="text-18 text-text-secondary max-w-xl mx-auto mb-6">
              {String(section.props.sub || "")}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                className="px-6 py-3 rounded-8 text-white font-medium text-14"
                style={{ backgroundColor: theme.primary }}
              >
                {String(section.props.cta || "Get Started")}
              </button>
              <span className="text-14 text-text-secondary font-mono">
                {String(section.props.phone || "")}
              </span>
            </div>
          </section>
        );

      case "services": {
        const items = (section.props.items as { title: string; desc: string; icon: string }[]) || [];
        return (
          <section key={index} className="px-6 py-12">
            <h2 className="text-24 font-semibold text-text-primary text-center mb-8 font-sans">Our Services</h2>
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {items.map((item, i) => (
                <div key={i} className="bg-navy-surface2/50 rounded-8 p-4 border border-navy-border/50">
                  <span className="text-24 mb-2 block">{getIcon(item.icon)}</span>
                  <h3 className="text-16 font-medium text-text-primary mb-1">{item.title}</h3>
                  <p className="text-13 text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "about":
        return (
          <section key={index} className="px-6 py-12 bg-navy-surface2/30">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-24 font-semibold text-text-primary mb-4 font-sans">
                {String(section.props.title || "About Us")}
              </h2>
              <p className="text-14 text-text-secondary leading-relaxed">
                {String(section.props.body || "")}
              </p>
            </div>
          </section>
        );

      case "testimonials": {
        const items = (section.props.items as { quote: string; author: string }[]) || [];
        return (
          <section key={index} className="px-6 py-12">
            <h2 className="text-24 font-semibold text-text-primary text-center mb-8 font-sans">What Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {items.map((item, i) => (
                <div key={i} className="bg-navy-surface1 rounded-8 p-4 border border-navy-border">
                  <p className="text-14 text-text-secondary italic mb-3">&ldquo;{item.quote}&rdquo;</p>
                  <p className="text-13 text-text-primary font-medium">{item.author}</p>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "contact":
        return (
          <section key={index} className="px-6 py-12 bg-navy-surface2/30">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-24 font-semibold text-text-primary mb-6 font-sans">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-12 text-text-secondary uppercase tracking-wider mb-1">Address</p>
                  <p className="text-14 text-text-primary">{String(section.props.address || "")}</p>
                </div>
                <div>
                  <p className="text-12 text-text-secondary uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-14 text-text-primary font-mono">{String(section.props.phone || "")}</p>
                </div>
                <div>
                  <p className="text-12 text-text-secondary uppercase tracking-wider mb-1">Hours</p>
                  <p className="text-14 text-text-primary">{String(section.props.hours || "")}</p>
                </div>
              </div>
            </div>
          </section>
        );

      case "footer":
        return (
          <footer key={index} className="px-6 py-6 text-center border-t border-navy-border/50">
            <p className="text-12 text-text-secondary">
              {String(section.props.copyright || "")}
            </p>
          </footer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-navy-base min-h-full text-text-primary font-sans">
      {sections.map(renderSection)}
    </div>
  );
}
