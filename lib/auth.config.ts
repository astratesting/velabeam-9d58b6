import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email },
          include: { workspace: true },
        });

        if (!user) {
          return null;
        }

        const isValid = await compare(password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          workspaceId: user.workspaceId,
          workspaceSlug: user.workspace.slug,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.workspaceId = (user as { workspaceId?: string }).workspaceId;
        token.workspaceSlug = (user as { workspaceSlug?: string }).workspaceSlug;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.workspaceId = token.workspaceId as string;
        session.user.workspaceSlug = token.workspaceSlug as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
} satisfies NextAuthConfig;
