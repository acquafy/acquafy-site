// app/m/ios/(flow)/bem-vindo/page.tsx
import type { Metadata } from "next";
import { MobileWelcome } from "@/components/mobile/sections/MobileWelcome";

export const metadata: Metadata = { title: "Bem-vindo" };

export default function IosWelcomePage() {
  return <MobileWelcome />;
}
