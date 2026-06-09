import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWorkspace } from "@/lib/session";
import { generateSite } from "@/lib/generator";
import { siteGenerateSchema } from "@/lib/validators";
import { writeActivity } from "@/lib/activity";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ctx = await requireWorkspace();
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const site = await prisma.site.findFirst({
    where: { id, workspaceId: ctx.workspaceId },
  });

  if (!site) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = siteGenerateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const content = await generateSite(parsed.data);

  // Create build record
  await prisma.build.create({
    data: {
      siteId: id,
      userId: ctx.userId,
      content: JSON.stringify(content),
    },
  });

  // Update site content
  const updated = await prisma.site.update({
    where: { id },
    data: {
      content: JSON.stringify(content),
      theme: JSON.stringify(content.theme),
      status: "draft",
    },
  });

  await writeActivity({
    workspaceId: ctx.workspaceId,
    userId: ctx.userId,
    siteId: id,
    type: "site.regenerated",
    message: `${site.businessName} regenerated`,
  });

  return NextResponse.json({ site: updated, content });
}
