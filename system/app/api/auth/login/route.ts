import { NextResponse, type NextRequest } from "next/server";
import { authConfigured, createAuthClient } from "@/lib/supabase/server";
import { portalRole } from "@/lib/portal-access";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
  function fail(status: number) {
    const result = NextResponse.json({ ok: false }, { status, headers: { "Cache-Control": "private, no-store" } });
    for (const cookie of response.cookies.getAll()) result.cookies.set(cookie);
    return result;
  }
  // JSON-only with no CORS prevents cross-origin browser form submissions.
  if (request.headers.get("sec-fetch-site") === "cross-site" || request.headers.get("content-type")?.split(";")[0] !== "application/json") return fail(403);
  if (!authConfigured()) return fail(503);
  try {
    const input = await request.json();
    if (typeof input.email !== "string" || input.email.length > 254 || typeof input.password !== "string" || !input.password || input.password.length > 1024 || typeof input.remember !== "boolean") return fail(400);
    const client = createAuthClient(request, response, input.remember);
    const { data, error } = await client.auth.signInWithPassword({ email: input.email.trim(), password: input.password });
    if (error || !data.user) return fail(401);
    const role = portalRole(data.user);
    if (!role) {
      await client.auth.signOut({ scope: "local" });
      return fail(403);
    }
    response.cookies.set("acq-remember", input.remember ? "1" : "0", {
      path: "/app", httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production",
      ...(input.remember ? { maxAge: 60 * 60 * 24 * 30 } : {}),
    });
    // Tells the form where a person with no specific destination starts. The session cookies travel with it.
    const result = NextResponse.json({ ok: true, internal: role === "internal" }, { headers: { "Cache-Control": "private, no-store" } });
    for (const cookie of response.cookies.getAll()) result.cookies.set(cookie);
    return result;
  } catch {
    return fail(503);
  }
}
