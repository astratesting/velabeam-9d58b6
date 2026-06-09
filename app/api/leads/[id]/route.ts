import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWorkspace } from "@/lib/session";
import { leadUpdateSchema } from "@/lib/validators";
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
  const lead = await prisma.lead.findFirst({
    where: { id, workspaceId: ctx.workspaceId },
    include: { activities: { orderBy: { createdAt: "desc" }, take: 20 } },
  });

  if (!lead) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ lead, activities: lead.activities });
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
  const lead = await prisma.lead.findFirst({
    where: { id, workspaceId: ctx.workspaceId },
  });

  if (!lead) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = leadUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const updated = await prisma.lead.update({
    where: { id },
    data: parsed.data,
  });

  // Write activity for status changes
  if (parsed.data.status && parsed.data.status !== lead.status) {
    await writeActivity({
      workspaceId: ctx.workspaceId,
      userId: ctx.userId,
      leadId: id,
      type: "lead.status_changed",
      message: `${lead.businessName}: ${lead.status} → ${parsed.data.status}`,
    });
  }

  return NextResponse.json({ lead: updated });
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
  const lead = await prisma.lead.findFirst({
    where: { id, workspaceId: ctx.workspaceId },
  });

  if (!lead) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.lead.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
