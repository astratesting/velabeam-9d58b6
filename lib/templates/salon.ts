export const salonTemplate = {
  id: "salon",
  name: "Salon",
  sectionOrder: ["hero", "services", "about", "testimonials", "contact", "footer"],
  theme: {
    primary: "#C471ED",
    font: "IBM Plex Sans",
  },
  copyBank: {
    defaultTagline: "Your neighborhood beauty destination",
    hero: {
      headline: "{businessName}",
      sub: "Your neighborhood beauty destination",
      cta: "Book Appointment",
    },
    services: [
      { title: "Haircut & Styling", desc: "Precision cuts, blowouts, and styling for all hair types", icon: "scissors" },
      { title: "Color Services", desc: "Full color, highlights, balayage, and color correction", icon: "palette" },
      { title: "Treatments", desc: "Deep conditioning, keratin treatments, and scalp therapy", icon: "sparkles" },
      { title: "Special Occasion", desc: "Updos, bridal hair, and event styling packages", icon: "star" },
    ],
    about: {
      title: "About {businessName}",
      body: "We are a locally owned salon in {city} dedicated to making every client look and feel their best. Our experienced stylists stay current with the latest trends and techniques to deliver exceptional results.",
    },
    testimonials: [
      { quote: "Best haircut I have ever had. The stylists really listen to what you want.", author: "Regular client" },
      { quote: "Welcoming atmosphere and amazing results every time.", author: "First-time visitor" },
      { quote: "My balayage turned out perfect. So happy I found this place!", author: "New client" },
    ],
    contact: {
      hours: "Tue-Sat: 9am-7pm, Sun-Mon: Closed",
    },
  },
  thumbnail: `<svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" fill="#0B1220"/>
    <rect x="10" y="10" width="180" height="30" rx="4" fill="#C471ED" opacity="0.3"/>
    <text x="100" y="30" text-anchor="middle" fill="#E6EDF7" font-family="sans-serif" font-size="10">Salon Template</text>
    <rect x="10" y="50" width="80" height="40" rx="4" fill="#101A2E"/>
    <rect x="100" y="50" width="90" height="40" rx="4" fill="#101A2E"/>
    <rect x="10" y="100" width="180" height="40" rx="4" fill="#101A2E"/>
  </svg>`,
};
