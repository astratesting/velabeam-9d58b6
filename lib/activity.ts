import { prisma } from "./prisma";

interface WriteActivityParams {
  workspaceId: string;
  userId?: string;
  leadId?: string;
  siteId?: string;
  type: string;
  message: string;
  meta?: Record<string, unknown>;
}

export async function writeActivity(params: WriteActivityParams) {
  return prisma.activity.create({
    data: {
      workspaceId: params.workspaceId,
      userId: params.userId,
      leadId: params.leadId,
      siteId: params.siteId,
      type: params.type,
      message: params.message,
      meta: params.meta ? JSON.stringify(params.meta) : null,
    },
  });
}
