// app/(base)/base/organismos/page.tsx
import type { Metadata } from "next";
import { BaseOrganismsView } from "@/components/base/BaseOrganismsView";

export const metadata: Metadata = { title: "Base · Organismos Desktop" };

export default function BaseDesktopOrganismsPage() {
  return <BaseOrganismsView kind="desktop" />;
}
