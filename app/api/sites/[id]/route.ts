import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWorkspace } from "@/lib/session";
import { writeActivity } from "@/lib/activity";

export async function GET(
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
    include: {
      builds: { orderBy: { createdAt: "desc" }, take: 5 },
      deployments: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!site) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ site });
}

export async function PATCH(
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
  const { status, content, theme } = body;

  const updateData: Record<string, unknown> = {};
  if (status) {
    updateData.status = status;
    if (status === "live") {
      updateData.publishedAt = new Date();
      updateData.deployCount = { increment: 1 };
    }
  }
  if (content) updateData.content = typeof content === "string" ? content : JSON.stringify(content);
  if (theme) updateData.theme = typeof theme === "string" ? theme : JSON.stringify(theme);

  const updated = await prisma.site.update({
    where: { id },
    data: updateData,
  });

  // Write activity
  if (status && status !== site.status) {
    const activityType = status === "live" ? "site.published" : status === "draft" ? "site.unpublished" : "site.status_changed";
    await writeActivity({
      workspaceId: ctx.workspaceId,
      userId: ctx.userId,
      siteId: id,
      type: activityType,
      message: `${site.businessName}: ${site.status} → ${status}`,
    });

    // Create deployment if publishing
    if (status === "live") {
      await prisma.deployment.create({
        data: {
          siteId: id,
          url: `https://${site.subdomain}.velabeam.app`,
          status: "success",
        },
      });
    }
  }

  return NextResponse.json({ site: updated });
}

export async function DELETE(
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

  // Soft delete
  await prisma.site.update({
    where: { id },
    data: { status: "deleted" },
  });

  await writeActivity({
    workspaceId: ctx.workspaceId,
    userId: ctx.userId,
    siteId: id,
    type: "site.deleted",
    message: `${site.businessName} deleted`,
  });

  return NextResponse.json({ success: true });
}
