// proxy.ts
//
// Gate for the portal. Desktop: anonymous visitors go to /login, signed-in ones skip it.
// Mobile app screens live under /m/ios/* and /m/android/* (one set of screens per platform); their
// public entry points are the welcome (onboarding) and login screens.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

const MOBILE_RE = /^\/m\/(ios|android)(\/.*)?$/;
const MOBILE_PUBLIC = new Set(["bem-vindo", "login"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = request.cookies.has(SESSION_COOKIE);

  const mobile = pathname.match(MOBILE_RE);
  if (mobile) {
    const platform = mobile[1];
    const screen = (mobile[2] ?? "").split("/").filter(Boolean)[0] ?? "";
    const isPublic = MOBILE_PUBLIC.has(screen);
    if (!signedIn && !isPublic) return NextResponse.redirect(new URL(`/m/${platform}/bem-vindo`, request.url));
    if (signedIn && isPublic) return NextResponse.redirect(new URL(`/m/${platform}/home`, request.url));
    return NextResponse.next();
  }

  // Internal hub of screens and components: open, so the links work without signing in.
  if (pathname === "/" || pathname === "/base" || pathname.startsWith("/base/")) return NextResponse.next();

  if (pathname === "/login") {
    if (signedIn) return NextResponse.redirect(new URL("/home", request.url));
    return NextResponse.next();
  }

  if (!signedIn) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // Everything except Next internals and static files.
  matcher: ["/((?!_next/|brand/|docs/|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)"],
};
