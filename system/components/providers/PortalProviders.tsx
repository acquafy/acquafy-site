// components/providers/PortalProviders.tsx
"use client";

import type { ReactNode } from "react";
import type { CurrencyCode } from "@/lib/currency";
import { CurrencyProvider } from "./CurrencyProvider";
import { ProfileProvider } from "./ProfileProvider";
import { ToastProvider } from "./ToastProvider";

export function PortalProviders({ currency, children }: { currency: CurrencyCode; children: ReactNode }) {
  return (
    <CurrencyProvider initial={currency}>
      <ProfileProvider>
        <ToastProvider>{children}</ToastProvider>
      </ProfileProvider>
    </CurrencyProvider>
  );
}
