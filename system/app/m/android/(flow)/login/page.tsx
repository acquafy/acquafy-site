// app/m/android/(flow)/login/page.tsx
import type { Metadata } from "next";
import { AndroidFlowColumn } from "@/components/mobile/android/AndroidFlowColumn";
import { MobileLogin } from "@/components/mobile/sections/MobileLogin";

export const metadata: Metadata = { title: "Entrar" };

export default function AndroidLoginPage() {
  return (
    <AndroidFlowColumn>
      <MobileLogin />
    </AndroidFlowColumn>
  );
}
