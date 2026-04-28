import type { NextAuthConfig } from "next-auth";

// This is the lightweight configuration for Edge Runtime (middleware/proxy).
// No DB models or heavy Node.js modules allowed here.
export const authConfig = {
  providers: [], // Providers added in the full auth.ts
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
        token.paymentStatus = (user as { paymentStatus?: string }).paymentStatus;
        token.isActive = (user as { isActive?: boolean }).isActive;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.paymentStatus = token.paymentStatus as string;
        session.user.isActive = token.isActive as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
