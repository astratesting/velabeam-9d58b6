export const autoRepairTemplate = {
  id: "auto-repair",
  name: "Auto Repair",
  sectionOrder: ["hero", "services", "about", "testimonials", "contact", "footer"],
  theme: {
    primary: "#4A90D9",
    font: "IBM Plex Sans",
  },
  copyBank: {
    defaultTagline: "Honest auto repair you can count on",
    hero: {
      headline: "{businessName}",
      sub: "Honest auto repair you can count on",
      cta: "Book Service",
    },
    services: [
      { title: "Engine Repair", desc: "Diagnostics, repair, and rebuild for all engine types", icon: "wrench" },
      { title: "Brake Service", desc: "Brake inspection, pad replacement, and rotor resurfacing", icon: "disc" },
      { title: "Oil & Maintenance", desc: "Oil changes, fluid checks, and scheduled maintenance", icon: "droplets" },
      { title: "Diagnostics", desc: "Advanced computer diagnostics and electrical troubleshooting", icon: "scan" },
    ],
    about: {
      title: "About {businessName}",
      body: "Our ASE-certified technicians in {city} provide honest, reliable auto repair for all makes and models. We explain every repair before we start and stand behind our work with a solid warranty.",
    },
    testimonials: [
      { quote: "They explained everything clearly and the price was fair.", author: "Long-time customer" },
      { quote: "Trustworthy shop that does quality work. My go-to mechanic.", author: "Repeat client" },
      { quote: "Quick turnaround and they kept me updated the whole time.", author: "First-time visitor" },
    ],
    contact: {
      hours: "Mon-Fri: 7:30am-6pm, Sat: 8am-2pm",
    },
  },
  thumbnail: `<svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" fill="#0B1220"/>
    <rect x="10" y="10" width="180" height="30" rx="4" fill="#4A90D9" opacity="0.3"/>
    <text x="100" y="30" text-anchor="middle" fill="#E6EDF7" font-family="sans-serif" font-size="10">Auto Repair Template</text>
    <rect x="10" y="50" width="80" height="40" rx="4" fill="#101A2E"/>
    <rect x="100" y="50" width="90" height="40" rx="4" fill="#101A2E"/>
    <rect x="10" y="100" width="180" height="40" rx="4" fill="#101A2E"/>
  </svg>`,
};
