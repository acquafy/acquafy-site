import { NextResponse, type NextRequest } from "next/server";
import { BYPASS_COOKIE, BYPASS_MAX_AGE_SECONDS, createBypassCookie, isBypassToken } from "@/lib/flags-bypass";

// GET /api/flags-bypass?token=<FLAGS_BYPASS_SECRET>[&next=/path]  turns every feature flag on for this browser only.
// GET /api/flags-bypass?clear=1                                   removes it again.
// Anything else (wrong token, bypass not configured) is a plain 404 so the endpoint does not advertise itself.
export const dynamic = "force-dynamic";

function destination(request: NextRequest): URL {
  const next = request.nextUrl.searchParams.get("next");
  // Same-origin paths only: no open redirect.
  const path = next && next.startsWith("/") && !next.startsWith("//") && !next.includes("\\") ? next : "/";
  return new URL(path, request.nextUrl.origin);
}

function respond(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(destination(request), 303);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  if (params.get("clear") === "1") {
    const response = respond(request);
    response.cookies.delete(BYPASS_COOKIE);
    return response;
  }
  if (!isBypassToken(params.get("token"))) return new NextResponse("Not found", { status: 404, headers: { "Cache-Control": "private, no-store" } });
  const value = await createBypassCookie();
  if (!value) return new NextResponse("Not found", { status: 404, headers: { "Cache-Control": "private, no-store" } });
  const response = respond(request);
  response.cookies.set(BYPASS_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: BYPASS_MAX_AGE_SECONDS,
  });
  return response;
}
