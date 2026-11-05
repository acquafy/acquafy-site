"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Sends the browser to another screen once this one renders. Pages under `loading.tsx` cannot use `redirect()`:
 * after the shell has streamed, Next 16 applies `basePath` twice and the visitor lands on /app/app/… (a 404).
 */
export function ReplaceRoute({ href }: { href: string }) {
  const router = useRouter();
  useEffect(() => router.replace(href), [router, href]);
  return null;
}
