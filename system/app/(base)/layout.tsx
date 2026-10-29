// app/(base)/layout.tsx
//
// Internal hub (screens, components, organisms), like the Interfy "video-blocks" index. Public (see proxy.ts), no portal
// shell; it only needs the providers the live component demos rely on (toast, currency, profile).
import type { Metadata } from "next";
import { BaseHeader } from "@/components/base/BaseHeader";
import { PortalProviders } from "@/components/providers/PortalProviders";
import { DEFAULT_CURRENCY } from "@/lib/currency";

export const metadata: Metadata = { title: "Base" };

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalProviders currency={DEFAULT_CURRENCY}>
      <div className="min-h-dvh bg-page">
        <BaseHeader />
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 lg:p-6">{children}</main>
      </div>
    </PortalProviders>
  );
}
