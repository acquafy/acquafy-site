// proxy.ts
//
// Gate for the portal. Desktop: anonymous visitors go to /login, signed-in ones skip it.
// Mobile app screens live under /m/ios/* and /m/android/* (one set of screens per platform); their
// public entry point is the login screen (the app goes straight to it, there is no onboarding).
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

const MOBILE_RE = /^\/m\/(ios|android|duo)(\/.*)?$/;
const MOBILE_PUBLIC = new Set(["login"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // The /base manual opens every screen: a page opened from /base (the referer) is let through even without a session, and (when it is a real
  // navigation, not a `?preview` thumbnail) it starts the demo session, so moving around inside the screen keeps working. `?preview` also skips
  // the signed-in redirect of the public screens, so the login stays on screen in thumbnails.
  const preview = request.nextUrl.searchParams.has("preview");
  const fromHub = (request.headers.get("referer") ?? "").includes("/base");
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const signedIn = hasSession || fromHub;
  const next = () => {
    const res = NextResponse.next();
    if (!hasSession && fromHub && !preview) res.cookies.set(SESSION_COOKIE, "1", { path: "/", sameSite: "lax" });
    return res;
  };
  const skipLoginRedirect = preview || fromHub;

  const mobile = pathname.match(MOBILE_RE);
  if (mobile) {
    const platform = mobile[1];
    // The two-device stage (/m/duo) is part of the /base manual: every screen opens in it, with or without a session, and Login too.
    if (platform === "duo") return NextResponse.next();
    const screen = (mobile[2] ?? "").split("/").filter(Boolean)[0] ?? "";
    const isPublic = MOBILE_PUBLIC.has(screen);
    if (!signedIn && !isPublic) return NextResponse.redirect(new URL(`/m/${platform}/login`, request.url));
    if (signedIn && isPublic && !skipLoginRedirect) return NextResponse.redirect(new URL(`/m/${platform}/home`, request.url));
    return next();
  }

  // Internal hub of screens and components: open, so the links work without signing in.
  if (pathname === "/" || pathname === "/base" || pathname.startsWith("/base/")) return NextResponse.next();

  if (pathname === "/login") {
    if (signedIn && !skipLoginRedirect) return NextResponse.redirect(new URL("/home", request.url));
    return NextResponse.next();
  }

  if (!signedIn) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
  return next();
}

export const config = {
  // Everything except Next internals and static files.
  matcher: ["/((?!_next/|brand/|docs/|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)"],
};
