import { NextResponse, type NextRequest } from "next/server";
import { authConfigured, createAuthClient } from "@/lib/supabase/server";
import { internalPath, loginPath, portalRole } from "@/lib/portal-access";
import { customerDestination } from "@/lib/orders/destination";
import { portalPath } from "@/lib/paths";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Retire the sample document library and route mobile URLs onto the same live product.
  if (path === "/docs" || path.startsWith("/docs/"))
    return new NextResponse("Arquivo não encontrado.", {
      status: 404,
      headers: { "Cache-Control": "private, no-store" },
    });
  const mobile = /^\/m\/(?:ios|android)(?:\/(.*))?$/.exec(path);
  if (mobile) {
    const screen = mobile[1]?.split("/")[0] || "home";
    const destination =
      screen === "financeiro"
        ? "extrato"
        : [
              "home",
              "purificadores",
              "contrato",
              "calendario",
              "documentos",
              "solicitar",
              "suporte",
              "perfil",
              "login",
            ].includes(screen)
          ? screen
          : "home";
    return NextResponse.redirect(
      new URL(portalPath("/" + destination), request.url),
    );
  }

  const login = loginPath(path);
  const isLogin = path === login;
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");

  function redirect(destination: string) {
    const result = NextResponse.redirect(
      new URL(portalPath(destination), request.url),
    );
    for (const cookie of response.cookies.getAll()) result.cookies.set(cookie);
    result.headers.set("Cache-Control", "private, no-store");
    return result;
  }

  if (
    path === "/api/auth/login" ||
    path === "/api/auth/logout" ||
    path === "/api/stripe/webhook" ||
    path === "/api/orders/notifications" ||
    path.startsWith("/api/orders/parceladousa/") ||
    path === "/api/stock" ||
    path === "/ativar" ||
    path === "/cadastro-investidor" ||
    path === "/cadastro" ||
    path === "/pedido" ||
    path === "/auth/confirm"
  )
    return response;
  if (!authConfigured())
    return isLogin
      ? response
      : redirect(
          login +
            (["/adesao", "/locacoes", "/pedidos"].includes(path) || /^\/pedidos\/[0-9a-f-]{36}$/.test(path)
              ? "?next=" + path.slice(1)
              : ""),
        );

  try {
    const {
      data: { user },
    } = await createAuthClient(request, response).auth.getUser();
    const forwarded = NextResponse.next({
      request: { headers: request.headers },
    });
    for (const cookie of response.cookies.getAll())
      forwarded.cookies.set(cookie);
    forwarded.headers.set("Cache-Control", "private, no-store");
    const role = portalRole(user);
    if (!role)
      return isLogin
        ? forwarded
        : redirect(
            login +
              (["/adesao", "/locacoes", "/pedidos"].includes(path) || /^\/pedidos\/[0-9a-f-]{36}$/.test(path)
                ? "?next=" + path.slice(1)
                : ""),
          );
    if (
      role === "customer" &&
      ![
        "/pedidos",
        "/locacoes",
        "/perfil",
        "/suporte",
        "/login",
        "/api/auth/logout",
      ].some((p) => path === p || path.startsWith(p + "/"))
    )
      return redirect("/pedidos");
    if (internalPath(path) && role !== "internal") {
      const denied = new NextResponse("Acesso restrito à equipe interna.", {
        status: 403,
        headers: { "Cache-Control": "private, no-store" },
      });
      for (const cookie of response.cookies.getAll())
        denied.cookies.set(cookie);
      return denied;
    }
    if (
      isLogin &&
      !(role === "internal" && request.nextUrl.searchParams.has("preview"))
    ) {
      const target = request.nextUrl.searchParams.get("next");
      return redirect(
        target
          ? customerDestination(target.startsWith("/") ? target : "/" + target)
          : role === "customer"
            ? "/pedidos"
            : login.replace(/login$/, "home"),
      );
    }
    return forwarded;
  } catch {
    return isLogin
      ? response
      : redirect(
          login +
            (["/adesao", "/locacoes", "/pedidos"].includes(path) || /^\/pedidos\/[0-9a-f-]{36}$/.test(path)
              ? "?next=" + path.slice(1)
              : ""),
        );
  }
}

export const config = {
  // Documents stay protected. Only public branding and Next bundles bypass auth.
  matcher: [
    "/",
    "/((?!_next/static|_next/image|_next/webpack-hmr|brand/|favicon.ico$).*)",
  ],
};
