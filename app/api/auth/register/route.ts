import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: Request) {
  // Rate limit: 5 registrations per IP per hour
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`register:${ip}`, 5, 3600000)) {
    return NextResponse.json({ error: "Too many registration attempts" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, name, workspaceName } = parsed.data;

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // Create workspace slug
    const slug = workspaceName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40);

    // Create workspace + user
    const passwordHash = await hash(password, 10);
    const workspace = await prisma.workspace.create({
      data: {
        name: workspaceName,
        slug: `${slug}-${Date.now().toString(36)}`,
        users: {
          create: {
            email,
            name,
            passwordHash,
          },
        },
      },
      include: { users: true },
    });

    const user = workspace.users[0];

    return NextResponse.json(
      { userId: user.id, workspaceId: workspace.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
