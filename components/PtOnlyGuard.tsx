"use client";

import { useLang } from "@/context/LanguageContext";
import type { ReactNode } from "react";

export function PtOnlyGuard({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  if (lang !== "pt") return null;
  return <>{children}</>;
}
