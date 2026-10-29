// components/mobile/MobileRoot.tsx
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { PortalProviders } from "@/components/providers/PortalProviders";
import { CURRENCY_COOKIE, DEFAULT_CURRENCY, isCurrency } from "@/lib/currency";
import type { Device } from "@/lib/mobile/devices";
import type { Platform } from "@/lib/mobile/platform";
import { PlatformProvider } from "./PlatformProvider";

/**
 * Root of one platform's app (`app/m/<platform>/layout.tsx`): platform scope + the same providers the desktop portal
 * uses (currency from its cookie, profile, toasts). Server component, so the first paint already has the currency.
 */
export async function MobileRoot({ platform, device = "phone", children }: { platform: Platform; device?: Device; children: ReactNode }) {
  const saved = (await cookies()).get(CURRENCY_COOKIE)?.value;
  const currency = isCurrency(saved) ? saved : DEFAULT_CURRENCY;
  return (
    <PlatformProvider platform={platform} device={device}>
      <PortalProviders currency={currency}>{children}</PortalProviders>
    </PlatformProvider>
  );
}
