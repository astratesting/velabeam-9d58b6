import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWorkspace } from "@/lib/session";
import { siteCreateSchema } from "@/lib/validators";
import { generateSite } from "@/lib/generator";
import { uniqueSlug } from "@/lib/slug";
import { writeActivity } from "@/lib/activity";

export async function GET(req: Request) {
  const ctx = await requireWorkspace();
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || undefined;
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "25", 10);

  const where: Record<string, unknown> = {
    workspaceId: ctx.workspaceId,
    status: { not: "deleted" },
  };
  if (status) where.status = status;

  const [sites, total] = await Promise.all([
    prisma.site.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.site.count({ where }),
  ]);

  return NextResponse.json({
    sites: sites.map((s) => ({
      ...s,
      content: undefined,
      theme: undefined,
    })),
    total,
    page,
    limit,
  });
}

export async function POST(req: Request) {
  const ctx = await requireWorkspace();
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = siteCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const subdomain = await uniqueSlug(data.businessName);

    // Generate site content
    const content = await generateSite({
      templateId: data.templateId,
      businessName: data.businessName,
      tagline: data.tagline,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      hours: data.hours,
      services: data.services,
      about: data.about,
      primaryColor: data.primaryColor,
    });

    const site = await prisma.site.create({
      data: {
        workspaceId: ctx.workspaceId,
        leadId: data.leadId || null,
        businessName: data.businessName,
        templateId: data.templateId,
        subdomain,
        status: "live",
        content: JSON.stringify(content),
        theme: JSON.stringify(content.theme),
        publishedAt: new Date(),
        deployCount: 1,
      },
    });

    // Create deployment record
    await prisma.deployment.create({
      data: {
        siteId: site.id,
        url: `https://${subdomain}.velabeam.app`,
        status: "success",
      },
    });

    // Create build record
    await prisma.build.create({
      data: {
        siteId: site.id,
        userId: ctx.userId,
        content: JSON.stringify(content),
      },
    });

    // Write activity
    await writeActivity({
      workspaceId: ctx.workspaceId,
      userId: ctx.userId,
      siteId: site.id,
      type: "site.published",
      message: `${data.businessName} deployed to ${subdomain}.velabeam.app`,
    });

    return NextResponse.json({
      site: {
        ...site,
        content: undefined,
        theme: undefined,
      },
      previewUrl: `https://${subdomain}.velabeam.app`,
    }, { status: 201 });
  } catch (error) {
    console.error("Site creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
