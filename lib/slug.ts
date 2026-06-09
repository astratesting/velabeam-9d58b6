import { prisma } from "./prisma";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

export async function uniqueSlug(businessName: string): Promise<string> {
  const base = slugify(businessName);
  let candidate = base;
  let suffix = 0;

  while (true) {
    const existing = await prisma.site.findUnique({
      where: { subdomain: candidate },
    });
    if (!existing) return candidate;
    suffix++;
    candidate = `${base}-${suffix}`;
  }
}
