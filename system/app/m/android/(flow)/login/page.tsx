// app/m/android/(flow)/login/page.tsx
import type { Metadata } from "next";
import { MobileLogin } from "@/components/mobile/sections/MobileLogin";

export const metadata: Metadata = { title: "Entrar" };

export default function AndroidLoginPage() {
  return <MobileLogin />;
}
