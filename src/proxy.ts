import { proxyAuth } from "@/lib/auth.proxy";
import { NextResponse } from "next/server";

export default proxyAuth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role?.toLowerCase() === "admin";
  const isActive = session?.user?.isActive;

  const isDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  // Protect /dashboard — must be logged in AND active
  if (isDashboard) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    if (!isActive && !isAdmin) {
      return NextResponse.redirect(new URL("/pending", nextUrl));
    }
  }

  // Protect /admin — must be admin
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  // Redirect logged-in users away from login/register
  if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
    if (isAdmin) return NextResponse.redirect(new URL("/admin", nextUrl));
    if (isActive) return NextResponse.redirect(new URL("/dashboard", nextUrl));
    return NextResponse.redirect(new URL("/pending", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
