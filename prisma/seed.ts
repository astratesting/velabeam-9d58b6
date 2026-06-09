import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create demo workspace
  const workspace = await prisma.workspace.upsert({
    where: { slug: "demo-agency" },
    update: {},
    create: {
      name: "Demo Agency",
      slug: "demo-agency",
    },
  });

  // Create demo user
  const passwordHash = await hash("demo1234", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@velabeam.app" },
    update: {},
    create: {
      email: "demo@velabeam.app",
      name: "Demo User",
      passwordHash,
      workspaceId: workspace.id,
    },
  });

  // Seed leads
  const leadData = [
    { businessName: "TideWell Plumbing", category: "Plumber", address: "412 Bay St", city: "Austin", state: "TX", phone: "(512) 555-0142", googleRating: 4.6, reviewCount: 87, lat: 30.2672, lng: -97.7431 },
    { businessName: "Rio Grande Electric", category: "Electrician", address: "1903 Congress Ave", city: "Austin", state: "TX", phone: "(512) 555-0198", googleRating: 4.3, reviewCount: 42, lat: 30.2747, lng: -97.7405 },
    { businessName: "Lone Star Cuts", category: "Salon", address: "880 E 7th St", city: "Austin", state: "TX", phone: "(512) 555-0211", googleRating: 4.8, reviewCount: 156, lat: 30.2638, lng: -97.7278 },
    { businessName: "Taqueria El Sol", category: "Restaurant", address: "2210 S 1st St", city: "Austin", state: "TX", phone: "(512) 555-0176", googleRating: 4.5, reviewCount: 203, lat: 30.2498, lng: -97.7676 },
    { businessName: "Barton Springs Auto", category: "Auto Repair", address: "1500 Barton Springs Rd", city: "Austin", state: "TX", phone: "(512) 555-0133", googleRating: 4.1, reviewCount: 64, lat: 30.2617, lng: -97.7579 },
    { businessName: "Cedar Park Dental", category: "Dentist", address: "3400 E Whitestone Blvd", city: "Cedar Park", state: "TX", phone: "(512) 555-0289", googleRating: 4.7, reviewCount: 118, lat: 30.5052, lng: -97.8203 },
    { businessName: "Hill Country Landscaping", category: "Landscaper", address: "7200 Manchaca Rd", city: "Austin", state: "TX", phone: "(512) 555-0301", googleRating: 4.4, reviewCount: 55, lat: 30.2099, lng: -97.8015 },
    { businessName: "Pflugerville Pet Care", category: "Other", address: "1601 Pflugerville Pkwy", city: "Pflugerville", state: "TX", phone: "(512) 555-0344", googleRating: 4.9, reviewCount: 91, lat: 30.4394, lng: -97.6200 },
    { businessName: "Round Rock Roofing Co", category: "Other", address: "2001 N Mays St", city: "Round Rock", state: "TX", phone: "(512) 555-0267", googleRating: 4.2, reviewCount: 38, lat: 30.5083, lng: -97.6789 },
    { businessName: "South Austin Movers", category: "Other", address: "5000 S Lamar Blvd", city: "Austin", state: "TX", phone: "(512) 555-0155", googleRating: 4.0, reviewCount: 27, lat: 30.2292, lng: -97.7972 },
    { businessName: "Dripping Springs Salon", category: "Salon", address: "100 Commons Rd", city: "Dripping Springs", state: "TX", phone: "(512) 555-0412", googleRating: 4.6, reviewCount: 73, lat: 30.1902, lng: -98.0867 },
    { businessName: "Georgetown Plumbing Pro", category: "Plumber", address: "905 S Main St", city: "Georgetown", state: "TX", phone: "(512) 555-0388", googleRating: 4.5, reviewCount: 62, lat: 30.6333, lng: -97.6780 },
  ];

  for (const lead of leadData) {
    await prisma.lead.upsert({
      where: { id: `seed-${lead.businessName.toLowerCase().replace(/\s+/g, "-")}` },
      update: {},
      create: {
        id: `seed-${lead.businessName.toLowerCase().replace(/\s+/g, "-")}`,
        ...lead,
        hasWebsite: false,
        workspaceId: workspace.id,
        source: "seed",
        status: "new",
      },
    });
  }

  console.log("Seeded demo workspace with user and 12 leads");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
