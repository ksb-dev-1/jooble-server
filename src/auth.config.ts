import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  trustHost: true,
  providers: [Google, GitHub],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id; // Store user ID in the JWT token
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   if (token?.id) {
    //     session.user.id = token.id as string; // Retrieve user ID from the JWT token
    //   }
    //   return session;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id || token?.sub) {
        session.user.id = (token.id ?? token.sub) as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
