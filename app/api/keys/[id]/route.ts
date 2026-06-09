import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWorkspace } from "@/lib/session";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ctx = await requireWorkspace();
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const key = await prisma.apiKey.findFirst({
    where: { id, userId: ctx.userId, revokedAt: null },
  });

  if (!key) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.apiKey.update({
    where: { id },
    data: { revokedAt: new Date() },
  });

  return NextResponse.json({ success: true });
}
