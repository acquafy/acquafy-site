// app/(base)/base/organismos-mobile/page.tsx
import type { Metadata } from "next";
import { BaseOrganismsView } from "@/components/base/BaseOrganismsView";

export const metadata: Metadata = { title: "Base · Organismos Mobile" };

export default function BaseMobileOrganismsPage() {
  return <BaseOrganismsView kind="mobile" />;
}
