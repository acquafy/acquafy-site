import { NextResponse, type NextRequest } from "next/server";
import { authConfigured, createAuthClient } from "@/lib/supabase/server";
import { internalPath, loginPath, portalRole } from "@/lib/portal-access";
import { portalPath } from "@/lib/paths";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const login = loginPath(path);
  const isLogin = path === login;
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");

  function redirect(destination: string) {
    const result = NextResponse.redirect(new URL(portalPath(destination), request.url));
    for (const cookie of response.cookies.getAll()) result.cookies.set(cookie);
    result.headers.set("Cache-Control", "private, no-store");
    return result;
  }

  if (path === "/api/auth/login" || path === "/api/auth/logout") return response;
  if (!authConfigured()) return isLogin ? response : redirect(login);

  try {
    const { data: { user } } = await createAuthClient(request, response).auth.getUser();
    const forwarded = NextResponse.next({ request: { headers: request.headers } });
    for (const cookie of response.cookies.getAll()) forwarded.cookies.set(cookie);
    forwarded.headers.set("Cache-Control", "private, no-store");
    const role = portalRole(user);
    if (!role) return isLogin ? forwarded : redirect(login);
    if (internalPath(path) && role !== "internal") {
      const denied = new NextResponse("Acesso restrito à equipe interna.", { status: 403, headers: { "Cache-Control": "private, no-store" } });
      for (const cookie of response.cookies.getAll()) denied.cookies.set(cookie);
      return denied;
    }
    if (isLogin && !(role === "internal" && request.nextUrl.searchParams.has("preview"))) {
      return redirect(login.replace(/login$/, "home"));
    }
    return forwarded;
  } catch {
    return isLogin ? response : redirect(login);
  }
}

export const config = {
  // Documents stay protected. Only public branding and Next bundles bypass auth.
  matcher: ["/", "/((?!_next/static|_next/image|_next/webpack-hmr|brand/|favicon.ico$).*)"],
};
