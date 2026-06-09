import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWorkspace } from "@/lib/session";
import { apiKeyCreateSchema } from "@/lib/validators";
import { generateApiKey } from "@/lib/api/keys";

export async function GET() {
  const ctx = await requireWorkspace();
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const keys = await prisma.apiKey.findMany({
    where: { userId: ctx.userId, revokedAt: null },
    select: { id: true, name: true, last4: true, createdAt: true, lastUsedAt: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ keys });
}

export async function POST(req: Request) {
  const ctx = await requireWorkspace();
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = apiKeyCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { token, hash, last4 } = generateApiKey();

  await prisma.apiKey.create({
    data: {
      workspaceId: ctx.workspaceId,
      userId: ctx.userId,
      name: parsed.data.name,
      hash,
      last4,
    },
  });

  // Return the plaintext token once
  return NextResponse.json({ token, last4 }, { status: 201 });
}
