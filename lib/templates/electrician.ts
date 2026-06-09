export const electricianTemplate = {
  id: "electrician",
  name: "Electrician",
  sectionOrder: ["hero", "services", "about", "testimonials", "contact", "footer"],
  theme: {
    primary: "#F5A623",
    font: "IBM Plex Sans",
  },
  copyBank: {
    defaultTagline: "Licensed electrical services for your home and business",
    hero: {
      headline: "{businessName}",
      sub: "Licensed electrical services for your home and business",
      cta: "Schedule Service",
    },
    services: [
      { title: "Wiring & Rewiring", desc: "Complete wiring and rewiring for new construction and renovations", icon: "zap" },
      { title: "Panel Upgrades", desc: "Electrical panel upgrades and circuit breaker replacement", icon: "cpu" },
      { title: "Lighting Design", desc: "Interior and exterior lighting installation and design", icon: "sun" },
      { title: "Safety Inspections", desc: "Comprehensive electrical safety inspections and code compliance", icon: "shield" },
    ],
    about: {
      title: "About {businessName}",
      body: "Our team of licensed electricians delivers safe, code-compliant electrical work for residential and commercial clients in {city}. We handle everything from simple repairs to full rewiring projects with professionalism and care.",
    },
    testimonials: [
      { quote: "Professional and knowledgeable. They upgraded our panel in one day.", author: "Homeowner" },
      { quote: "Reliable service and clear communication throughout the project.", author: "Business owner" },
      { quote: "Fair quotes and excellent workmanship. Will use again.", author: "Repeat client" },
    ],
    contact: {
      hours: "Mon-Fri: 7am-6pm, Sat: 9am-3pm",
    },
  },
  thumbnail: `<svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" fill="#0B1220"/>
    <rect x="10" y="10" width="180" height="30" rx="4" fill="#F5A623" opacity="0.3"/>
    <text x="100" y="30" text-anchor="middle" fill="#E6EDF7" font-family="sans-serif" font-size="10">Electrician Template</text>
    <rect x="10" y="50" width="80" height="40" rx="4" fill="#101A2E"/>
    <rect x="100" y="50" width="90" height="40" rx="4" fill="#101A2E"/>
    <rect x="10" y="100" width="180" height="40" rx="4" fill="#101A2E"/>
  </svg>`,
};
