import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWorkspace } from "@/lib/session";
import { leadScanSchema } from "@/lib/validators";
import { generateMockLeads } from "@/lib/leads/mockEngine";
import { writeActivity } from "@/lib/activity";

export async function GET(req: Request) {
  const ctx = await requireWorkspace();
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || undefined;
  const q = url.searchParams.get("q") || undefined;
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "25", 10);

  const where: Record<string, unknown> = { workspaceId: ctx.workspaceId };
  if (status) where.status = status;
  if (q) {
    where.businessName = { contains: q };
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({ leads, total, page, limit });
}

export async function POST(req: Request) {
  const ctx = await requireWorkspace();
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = leadScanSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { area, radius, categories } = parsed.data;
    const mockLeads = generateMockLeads(area, radius, categories);

    // Save to DB
    const created = await Promise.all(
      mockLeads.map((lead) =>
        prisma.lead.create({
          data: {
            ...lead,
            workspaceId: ctx.workspaceId,
          },
        })
      )
    );

    // Write activity
    await writeActivity({
      workspaceId: ctx.workspaceId,
      userId: ctx.userId,
      type: "lead.scanned",
      message: `Scanned "${area}" — ${created.length} leads found`,
    });

    return NextResponse.json({ leads: created, count: created.length });
  } catch (error) {
    console.error("Lead scan error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
