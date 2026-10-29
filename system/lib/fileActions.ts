// lib/fileActions.ts
//
// Browser helpers for files shared by the Documents and Contract screens: downloading a stored file,
// opening it, copying a link, and sizing. Client-side only: call them from event handlers.

/** Starts the download of `href` (a file under /public, a data: or a blob: URL) saved as `filename`. */
export function downloadFromUrl(href: string, filename: string): void {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.rel = "noopener";
  document.body.append(a);
  a.click();
  a.remove();
}

/** Opens `href` in a new tab. Returns false when the browser blocked the pop-up. */
export function openInNewTab(href: string): boolean {
  return window.open(href, "_blank", "noopener,noreferrer") !== null;
}

/** Absolute URL of a path of this site ("/docs/x.pdf" → "https://host/docs/x.pdf"). */
export function absoluteUrl(path: string): string {
  return new URL(path, window.location.origin).href;
}

/** Copies text to the clipboard; resolves to whether it worked. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/** `data:` URL → `blob:` URL (PDFs and images render more reliably in frames that way). Revoke it when done. */
export function dataUrlToBlobUrl(dataUrl: string): string | null {
  try {
    const [head, body] = dataUrl.split(",");
    const mime = /^data:([^;]+)/.exec(head)?.[1] ?? "application/octet-stream";
    const bytes = Uint8Array.from(atob(body), (c) => c.charCodeAt(0));
    return URL.createObjectURL(new Blob([bytes], { type: mime }));
  } catch {
    return null;
  }
}

/** 1258291 → "1,2 MB" · 980 * 1024 → "980 KB" (binary units, pt-BR decimal comma). */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".0", "").replace(".", ",")} MB`;
}
