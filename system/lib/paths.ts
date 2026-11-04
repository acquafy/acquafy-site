/** Next links/router add basePath. Native URLs, images and fetch do not. */
export const PORTAL_BASE_PATH = "/app";

export function portalPath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || path === PORTAL_BASE_PATH || path.startsWith(`${PORTAL_BASE_PATH}/`)) return path;
  return `${PORTAL_BASE_PATH}${path}`;
}
