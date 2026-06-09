// MOCK: Generates deterministic site content from business details.
// TODO: swap with OpenAI LLM generation when OPENAI_API_KEY is set.

export interface SiteSection {
  type: string;
  props: Record<string, unknown>;
}

export interface GeneratedSite {
  template: string;
  theme: { primary: string; font: string };
  sections: SiteSection[];
}

interface GenerateInput {
  templateId: string;
  businessName: string;
  tagline?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  hours?: string;
  services?: string;
  about?: string;
  primaryColor?: string;
}

const TEMPLATE_COPY: Record<string, {
  defaultTagline: string;
  services: { title: string; desc: string; icon: string }[];
  aboutBody: string;
  testimonials: { quote: string; author: string }[];
}> = {
  plumber: {
    defaultTagline: "Professional plumbing services you can trust",
    services: [
      { title: "Emergency Repairs", desc: "24/7 emergency plumbing repair for leaks, burst pipes, and flooding", icon: "wrench" },
      { title: "Drain Cleaning", desc: "Professional drain cleaning and sewer line maintenance", icon: "droplets" },
      { title: "Water Heater", desc: "Installation, repair, and replacement of all water heater types", icon: "flame" },
      { title: "Pipe Installation", desc: "New pipe installation and repiping for homes and businesses", icon: "settings" },
    ],
    aboutBody: "With years of experience serving the local community, we provide reliable plumbing services for residential and commercial properties. Our licensed technicians are available around the clock.",
    testimonials: [
      { quote: "Fast response and professional work. Fixed our leak in under an hour.", author: "Local homeowner" },
      { quote: "Fair pricing and honest service. Highly recommended.", author: "Property manager" },
    ],
  },
  electrician: {
    defaultTagline: "Licensed electrical services for your home and business",
    services: [
      { title: "Wiring & Rewiring", desc: "Complete wiring and rewiring for new construction and renovations", icon: "zap" },
      { title: "Panel Upgrades", desc: "Electrical panel upgrades and circuit breaker replacement", icon: "cpu" },
      { title: "Lighting Design", desc: "Interior and exterior lighting installation and design", icon: "sun" },
      { title: "Safety Inspections", desc: "Comprehensive electrical safety inspections and code compliance", icon: "shield" },
    ],
    aboutBody: "Our team of licensed electricians delivers safe, code-compliant electrical work for residential and commercial clients. We handle everything from simple repairs to full rewiring projects.",
    testimonials: [
      { quote: "Professional and knowledgeable. They upgraded our panel in one day.", author: "Homeowner" },
      { quote: "Reliable service and clear communication throughout the project.", author: "Business owner" },
    ],
  },
  salon: {
    defaultTagline: "Your neighborhood beauty destination",
    services: [
      { title: "Haircut & Styling", desc: "Precision cuts, blowouts, and styling for all hair types", icon: "scissors" },
      { title: "Color Services", desc: "Full color, highlights, balayage, and color correction", icon: "palette" },
      { title: "Treatments", desc: "Deep conditioning, keratin treatments, and scalp therapy", icon: "sparkles" },
      { title: "Special Occasion", desc: "Updos, bridal hair, and event styling packages", icon: "star" },
    ],
    aboutBody: "We are a locally owned salon dedicated to making every client look and feel their best. Our experienced stylists stay current with the latest trends and techniques.",
    testimonials: [
      { quote: "Best haircut I have ever had. The stylists really listen to what you want.", author: "Regular client" },
      { quote: "Welcoming atmosphere and amazing results every time.", author: "First-time visitor" },
    ],
  },
  restaurant: {
    defaultTagline: "Fresh ingredients, authentic flavors, local favorite",
    services: [
      { title: "Dine-In", desc: "Enjoy our full menu in a comfortable, welcoming atmosphere", icon: "utensils" },
      { title: "Takeout", desc: "Order ahead for quick pickup of your favorite dishes", icon: "package" },
      { title: "Catering", desc: "Custom catering for events, meetings, and celebrations", icon: "calendar" },
      { title: "Private Events", desc: "Host your next gathering in our private dining space", icon: "users" },
    ],
    aboutBody: "We are a locally owned restaurant committed to serving fresh, flavorful food made with quality ingredients. Our menu features classic dishes with a modern twist, crafted by our experienced kitchen team.",
    testimonials: [
      { quote: "Consistently great food and friendly service. Our go-to spot.", author: "Neighborhood regular" },
      { quote: "The catering for our office event was outstanding.", author: "Event organizer" },
    ],
  },
  "auto-repair": {
    defaultTagline: "Honest auto repair you can count on",
    services: [
      { title: "Engine Repair", desc: "Diagnostics, repair, and rebuild for all engine types", icon: "wrench" },
      { title: "Brake Service", desc: "Brake inspection, pad replacement, and rotor resurfacing", icon: "disc" },
      { title: "Oil & Maintenance", desc: "Oil changes, fluid checks, and scheduled maintenance", icon: "droplets" },
      { title: "Diagnostics", desc: "Advanced computer diagnostics and electrical troubleshooting", icon: "scan" },
    ],
    aboutBody: "Our ASE-certified technicians provide honest, reliable auto repair for all makes and models. We explain every repair before we start and stand behind our work with a solid warranty.",
    testimonials: [
      { quote: "They explained everything clearly and the price was fair.", author: "Long-time customer" },
      { quote: "Trustworthy shop that does quality work.", author: "Repeat client" },
    ],
  },
  dentist: {
    defaultTagline: "Gentle, modern dental care for the whole family",
    services: [
      { title: "Preventive Care", desc: "Cleanings, exams, and digital X-rays for optimal oral health", icon: "shield" },
      { title: "Restorative", desc: "Fillings, crowns, bridges, and implant restorations", icon: "wrench" },
      { title: "Cosmetic", desc: "Teeth whitening, veneers, and smile makeovers", icon: "sparkles" },
      { title: "Emergency", desc: "Same-day appointments for dental emergencies and tooth pain", icon: "zap" },
    ],
    aboutBody: "Our dental practice combines modern technology with a gentle, patient-focused approach. We provide comprehensive dental care for patients of all ages in a comfortable setting.",
    testimonials: [
      { quote: "The most comfortable dental experience I have ever had.", author: "New patient" },
      { quote: "Great with kids and very thorough with their work.", author: "Parent" },
    ],
  },
  landscaper: {
    defaultTagline: "Transform your outdoor space",
    services: [
      { title: "Lawn Care", desc: "Mowing, fertilization, weed control, and seasonal maintenance", icon: "leaf" },
      { title: "Hardscaping", desc: "Patios, walkways, retaining walls, and outdoor living spaces", icon: "layers" },
      { title: "Planting", desc: "Tree, shrub, and flower bed design and installation", icon: "flower" },
      { title: "Irrigation", desc: "Sprinkler system installation, repair, and winterization", icon: "droplets" },
    ],
    aboutBody: "We design, install, and maintain beautiful outdoor spaces for residential and commercial properties. Our team brings creativity and expertise to every project, from routine lawn care to complete landscape renovations.",
    testimonials: [
      { quote: "They completely transformed our backyard. Couldn't be happier.", author: "Homeowner" },
      { quote: "Reliable weekly maintenance and always on schedule.", author: "Commercial client" },
    ],
  },
  other: {
    defaultTagline: "Professional services for your home and business",
    services: [
      { title: "Consultation", desc: "Expert assessment and recommendations for your project", icon: "clipboard" },
      { title: "Installation", desc: "Professional installation with attention to detail", icon: "settings" },
      { title: "Maintenance", desc: "Scheduled maintenance to keep everything running smoothly", icon: "refresh" },
      { title: "Emergency", desc: "Priority response for urgent service needs", icon: "zap" },
    ],
    aboutBody: "We are a locally owned business committed to delivering quality workmanship and excellent customer service. Our experienced team handles projects of all sizes with professionalism and care.",
    testimonials: [
      { quote: "Professional team that delivers on their promises.", author: "Satisfied customer" },
      { quote: "Great value and reliable service.", author: "Repeat client" },
    ],
  },
};

export function generateMockSite(input: GenerateInput): GeneratedSite {
  const template = TEMPLATE_COPY[input.templateId] || TEMPLATE_COPY.other;
  const primary = input.primaryColor || "#2D5BFF";
  const tagline = input.tagline || template.defaultTagline;
  const city = input.city || "your area";

  return {
    template: input.templateId,
    theme: { primary, font: "IBM Plex Sans" },
    sections: [
      {
        type: "hero",
        props: {
          headline: input.businessName,
          sub: tagline,
          cta: "Get a Free Quote",
          phone: input.phone || "(555) 000-0000",
          bg: "gradient",
        },
      },
      {
        type: "services",
        props: {
          items: template.services,
        },
      },
      {
        type: "about",
        props: {
          title: `About ${input.businessName}`,
          body: input.about || template.aboutBody.replace("local community", city),
          imageAlt: `${input.businessName} team`,
        },
      },
      {
        type: "testimonials",
        props: {
          items: template.testimonials,
        },
      },
      {
        type: "contact",
        props: {
          address: input.address || "123 Main St",
          phone: input.phone || "(555) 000-0000",
          hours: input.hours || "Mon-Fri: 8am-6pm, Sat: 9am-2pm",
          mapEmbedUrl: "",
        },
      },
      {
        type: "footer",
        props: {
          copyright: `${new Date().getFullYear()} ${input.businessName}. All rights reserved.`,
        },
      },
    ],
  };
}
