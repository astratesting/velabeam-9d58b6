import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    workspaceId?: string;
    workspaceSlug?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      workspaceId: string;
      workspaceSlug: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    workspaceId?: string;
    workspaceSlug?: string;
  }
}
