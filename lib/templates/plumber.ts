export const plumberTemplate = {
  id: "plumber",
  name: "Plumber",
  sectionOrder: ["hero", "services", "about", "testimonials", "contact", "footer"],
  theme: {
    primary: "#1E6BB8",
    font: "IBM Plex Sans",
  },
  copyBank: {
    defaultTagline: "Professional plumbing services you can trust",
    hero: {
      headline: "{businessName}",
      sub: "Professional plumbing services you can trust",
      cta: "Get a Free Quote",
    },
    services: [
      { title: "Emergency Repairs", desc: "24/7 emergency plumbing repair for leaks, burst pipes, and flooding", icon: "wrench" },
      { title: "Drain Cleaning", desc: "Professional drain cleaning and sewer line maintenance", icon: "droplets" },
      { title: "Water Heater", desc: "Installation, repair, and replacement of all water heater types", icon: "flame" },
      { title: "Pipe Installation", desc: "New pipe installation and repiping for homes and businesses", icon: "settings" },
    ],
    about: {
      title: "About {businessName}",
      body: "With years of experience serving the {city} community, we provide reliable plumbing services for residential and commercial properties. Our licensed technicians are available around the clock to handle any plumbing issue, big or small.",
    },
    testimonials: [
      { quote: "Fast response and professional work. Fixed our leak in under an hour.", author: "Local homeowner" },
      { quote: "Fair pricing and honest service. Highly recommended for any plumbing need.", author: "Property manager" },
      { quote: "They handled our whole-house repiping with minimal disruption.", author: "Satisfied customer" },
    ],
    contact: {
      hours: "Mon-Fri: 7am-7pm, Sat: 8am-4pm, Emergency: 24/7",
    },
  },
  thumbnail: `<svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" fill="#0B1220"/>
    <rect x="10" y="10" width="180" height="30" rx="4" fill="#1E6BB8" opacity="0.3"/>
    <text x="100" y="30" text-anchor="middle" fill="#E6EDF7" font-family="sans-serif" font-size="10">Plumber Template</text>
    <rect x="10" y="50" width="80" height="40" rx="4" fill="#101A2E"/>
    <rect x="100" y="50" width="90" height="40" rx="4" fill="#101A2E"/>
    <rect x="10" y="100" width="180" height="40" rx="4" fill="#101A2E"/>
  </svg>`,
};
