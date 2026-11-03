import { NextResponse, type NextRequest } from "next/server";
import { authConfigured, createAuthClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site" || request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
  if (authConfigured()) {
    const { error } = await createAuthClient(request, response).auth.signOut({ scope: "local" });
    if (error) return NextResponse.json({ ok: false }, { status: 503 });
  }
  response.cookies.set("acq-remember", "", { path: "/app", maxAge: 0, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  return response;
}
