import "server-only";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

export function authConfigured(): boolean {
  return !!process.env.SUPABASE_URL && !!process.env.SUPABASE_PUBLISHABLE_KEY;
}

/** One client per request. Carry its response cookies through redirects and errors. */
export function createAuthClient(request: NextRequest, response: NextResponse, remember = request.cookies.get("acq-remember")?.value !== "0") {
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookieOptions: { path: "/app", httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" },
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookies, headers) {
        for (const [name, value] of Object.entries(headers)) response.headers.set(name, value);
        for (const { name, value, options } of cookies) {
          request.cookies.set(name, value);
          response.cookies.set(name, value, {
            ...options,
            ...(!remember && options.maxAge !== 0 ? { maxAge: undefined, expires: undefined } : {}),
          });
        }
      },
    },
  });
}
