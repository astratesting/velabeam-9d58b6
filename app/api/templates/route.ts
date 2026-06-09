import { NextResponse } from "next/server";
import { getTemplates } from "@/lib/templates/registry";

export async function GET() {
  const templates = getTemplates().map((t) => ({
    id: t.id,
    name: t.name,
    thumbnail: t.thumbnail,
    theme: t.theme,
  }));

  return NextResponse.json({ templates });
}
