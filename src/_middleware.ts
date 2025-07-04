import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Use Edge-compatible settings
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Public routes (accessible without authentication)
  const publicRoutes = ["/", "/sign-in"];

  // If the user is not authenticated and the route is not public, redirect to /signin
  if (!session && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/jobs", "/saved", "/applied", "/profile", "/pricing"], // These routes require authentication
};
