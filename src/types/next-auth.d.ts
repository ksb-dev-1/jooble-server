// types/next-auth.d.ts or anywhere in your project (ensure it's picked up by tsconfig)

import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }

  interface JWT {
    id?: string;
  }
}
