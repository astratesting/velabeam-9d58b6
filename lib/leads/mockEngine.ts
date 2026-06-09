// MOCK: Deterministic lead generator seeded by area string.
// TODO: swap with Google Places / Yelp Fusion API integration.

interface MockLead {
  businessName: string;
  category: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  hasWebsite: boolean;
  domainAge: null;
  googleRating: number;
  reviewCount: number;
  lat: number;
  lng: number;
}

const CATEGORIES = ["Plumber", "Electrician", "Salon", "Restaurant", "Auto Repair", "Dentist", "Landscaper", "Other"] as const;

const CITY_DATA: Record<string, { state: string; lat: number; lng: number; zip: string }> = {
  austin: { state: "TX", lat: 30.2672, lng: -97.7431, zip: "78701" },
  "san antonio": { state: "TX", lat: 29.4241, lng: -98.4936, zip: "78201" },
  dallas: { state: "TX", lat: 32.7767, lng: -96.797, zip: "75201" },
  houston: { state: "TX", lat: 29.7604, lng: -95.3698, zip: "77001" },
  denver: { state: "CO", lat: 39.7392, lng: -104.9903, zip: "80201" },
  "los angeles": { state: "CA", lat: 34.0522, lng: -118.2437, zip: "90001" },
  "new york": { state: "NY", lat: 40.7128, lng: -74.006, zip: "10001" },
  chicago: { state: "IL", lat: 41.8781, lng: -87.6298, zip: "60601" },
  miami: { state: "FL", lat: 25.7617, lng: -80.1918, zip: "33101" },
  seattle: { state: "WA", lat: 47.6062, lng: -122.3321, zip: "98101" },
};

const BUSINESS_NAMES: Record<string, string[]> = {
  Plumber: ["FlowRight Plumbing", "ClearPipe Services", "AquaFix Pro", "DrainMaster Solutions", "LeakStop Plumbing Co", "PipeWorks Elite", "WaterLine Plumbing", "PressureFit Services"],
  Electrician: ["BrightWire Electric", "VoltPro Services", "CircuitBreak Electric", "AmpFlow Solutions", "WattWorks Electric", "SparkSafe Pro", "PowerGrid Electric", "LiveWire Solutions"],
  Salon: ["ShearStyle Studio", "ClipArt Salon", "ManeEvent Hair", "BelleVogue Beauty", "GlowUp Salon", "Strand Studio", "StyleCraft Hair Co", "Prism Beauty Bar"],
  Restaurant: ["Harbor Table Kitchen", "CopperPlate Eatery", "The Rustic Fork", "Salt & Vine Bistro", "GoldenPlate Diner", "BayLeaf Kitchen", "IronSkillet Cafe", "Tablestone Restaurant"],
  "Auto Repair": ["GearWorks Auto", "TorquePoint Garage", "PrecisionAuto Shop", "Ironclad Motors", "PistonPro Repair", "SteelWheel Auto", "ShiftPoint Service", "BlueLine Auto Care"],
  Dentist: ["BrightSmile Dental", "ClearView Dentistry", "GentleCare Dental", "PearlyWhite Studio", "SmileWorks Dental", "ToothCraft Clinic", "DentaLux Care", "OralPrecision Dental"],
  Landscaper: ["GreenEdge Landscapes", "TerraScape Pro", "LawnLogic Services", "EverGreen Grounds", "NatureCraft Landscaping", "PrimeCut Lawn Care", "SodWorks Pro", "BloomField Gardens"],
  Other: ["QuickFix Services", "ProServe Solutions", "LocalHero Services", "TrustPoint Business", "Pinnacle Services", "FirstRate Solutions", "CoreWorks Pro", "SummitService Co"],
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const STREETS = [
  "Main St", "Oak Ave", "Elm Blvd", "Pine Rd", "Cedar Ln",
  "Maple Dr", "First St", "Second St", "Park Ave", "Broadway",
  "Commerce St", "Market St", "Front St", "Highland Ave", "Lake Dr",
];

export function generateMockLeads(area: string, radius: number, categories: string[]): MockLead[] {
  const seed = hashString(area.toLowerCase());
  const rand = seededRandom(seed);
  const areaLower = area.toLowerCase();

  // Extract city name
  let cityKey = Object.keys(CITY_DATA).find((c) => areaLower.includes(c));
  const cityData = cityKey ? CITY_DATA[cityKey] : { state: "TX", lat: 30.2672, lng: -97.7431, zip: "78701" };
  const cityName = area.split(",")[0].trim();

  const selectedCats = categories.length > 0
    ? categories.filter((c) => CATEGORIES.includes(c as typeof CATEGORIES[number]))
    : [...CATEGORIES];

  const count = Math.floor(rand() * 18) + 8; // 8-25
  const leads: MockLead[] = [];

  for (let i = 0; i < count; i++) {
    const category = selectedCats[Math.floor(rand() * selectedCats.length)] || "Other";
    const names = BUSINESS_NAMES[category] || BUSINESS_NAMES.Other;
    const name = names[Math.floor(rand() * names.length)];
    const street = STREETS[Math.floor(rand() * STREETS.length)];
    const streetNum = Math.floor(rand() * 9000) + 100;
    const rating = Math.round((3.8 + rand() * 1.1) * 10) / 10;
    const reviews = Math.floor(rand() * 200) + 10;
    const latOffset = (rand() - 0.5) * (radius / 15) * 0.1;
    const lngOffset = (rand() - 0.5) * (radius / 15) * 0.1;

    leads.push({
      businessName: `${name} ${i > 7 ? i : ""}`.trim(),
      category,
      address: `${streetNum} ${street}`,
      city: cityName,
      state: cityData.state,
      phone: `(${Math.floor(rand() * 900) + 100}) ${Math.floor(rand() * 900) + 100}-${Math.floor(rand() * 9000) + 1000}`,
      hasWebsite: false,
      domainAge: null,
      googleRating: rating,
      reviewCount: reviews,
      lat: cityData.lat + latOffset,
      lng: cityData.lng + lngOffset,
    });
  }

  return leads;
}
