// app/m/ios/(flow)/login/page.tsx
import type { Metadata } from "next";
import { MobileLogin } from "@/components/mobile/sections/MobileLogin";

export const metadata: Metadata = { title: "Entrar" };

export default function IosLoginPage() {
  return <MobileLogin />;
}
