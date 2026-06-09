import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWorkspace } from "@/lib/session";
import { workspaceUpdateSchema } from "@/lib/validators";

export async function GET(req: Request) {
  const ctx = await requireWorkspace();
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const includeActivities = url.searchParams.get("include") === "activities";

  const workspace = await prisma.workspace.findUnique({
    where: { id: ctx.workspaceId },
    include: {
      users: { select: { id: true, email: true, name: true } },
    },
  });

  if (!workspace) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let activities: unknown[] = [];
  if (includeActivities) {
    activities = await prisma.activity.findMany({
      where: { workspaceId: ctx.workspaceId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }

  return NextResponse.json({ workspace, activities });
}

export async function PATCH(req: Request) {
  const ctx = await requireWorkspace();
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = workspaceUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const updated = await prisma.workspace.update({
    where: { id: ctx.workspaceId },
    data: parsed.data,
  });

  return NextResponse.json({ workspace: updated });
}
