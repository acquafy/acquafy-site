export type PortalRole = "internal" | "partner" | "customer";

type PortalUser = {
  email_confirmed_at?: string | null;
  is_anonymous?: boolean;
  app_metadata?: Record<string, unknown>;
};

/** Only administrator-controlled app_metadata grants access; user_metadata is untrusted. */
export function portalRole(user: PortalUser | null | undefined): PortalRole | null {
  if (!user?.email_confirmed_at || user.is_anonymous) return null;
  const role = user.app_metadata?.portal_role;
  return role === "internal" || role === "partner" || role === "customer" ? role : null;
}

export function internalPath(path: string): boolean {
  return path === "/base" || path.startsWith("/base/") || path === "/m/duo" || path.startsWith("/m/duo/");
}

export function loginPath(path: string): string {
  const platform = /^\/m\/(ios|android)(?:\/|$)/.exec(path)?.[1];
  return platform ? `/m/${platform}/login` : "/login";
}
