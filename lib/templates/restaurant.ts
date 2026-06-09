export const restaurantTemplate = {
  id: "restaurant",
  name: "Restaurant",
  sectionOrder: ["hero", "services", "about", "testimonials", "contact", "footer"],
  theme: {
    primary: "#E8593A",
    font: "IBM Plex Sans",
  },
  copyBank: {
    defaultTagline: "Fresh ingredients, authentic flavors, local favorite",
    hero: {
      headline: "{businessName}",
      sub: "Fresh ingredients, authentic flavors, local favorite",
      cta: "View Menu",
    },
    services: [
      { title: "Dine-In", desc: "Enjoy our full menu in a comfortable, welcoming atmosphere", icon: "utensils" },
      { title: "Takeout", desc: "Order ahead for quick pickup of your favorite dishes", icon: "package" },
      { title: "Catering", desc: "Custom catering for events, meetings, and celebrations", icon: "calendar" },
      { title: "Private Events", desc: "Host your next gathering in our private dining space", icon: "users" },
    ],
    about: {
      title: "About {businessName}",
      body: "We are a locally owned restaurant in {city} committed to serving fresh, flavorful food made with quality ingredients. Our menu features classic dishes with a modern twist, crafted by our experienced kitchen team.",
    },
    testimonials: [
      { quote: "Consistently great food and friendly service. Our go-to spot.", author: "Neighborhood regular" },
      { quote: "The catering for our office event was outstanding.", author: "Event organizer" },
      { quote: "Best restaurant in the area. The portions are generous and prices fair.", author: "Food enthusiast" },
    ],
    contact: {
      hours: "Mon-Thu: 11am-9pm, Fri-Sat: 11am-10pm, Sun: 10am-8pm",
    },
  },
  thumbnail: `<svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" fill="#0B1220"/>
    <rect x="10" y="10" width="180" height="30" rx="4" fill="#E8593A" opacity="0.3"/>
    <text x="100" y="30" text-anchor="middle" fill="#E6EDF7" font-family="sans-serif" font-size="10">Restaurant Template</text>
    <rect x="10" y="50" width="80" height="40" rx="4" fill="#101A2E"/>
    <rect x="100" y="50" width="90" height="40" rx="4" fill="#101A2E"/>
    <rect x="10" y="100" width="180" height="40" rx="4" fill="#101A2E"/>
  </svg>`,
};
