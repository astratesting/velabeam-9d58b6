import { auth } from "./auth";
import { prisma } from "./prisma";

export async function requireSession() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  return session;
}

export async function requireWorkspace() {
  const session = await requireSession();
  if (!session?.user?.workspaceId) {
    return null;
  }
  return {
    session,
    workspaceId: session.user.workspaceId as string,
    userId: session.user.id as string,
  };
}
