// app/(auth)/login/page.tsx
import type { Metadata } from "next";
import { LoginBrandPanel } from "@/components/sections/LoginBrandPanel";
import { LoginForm } from "@/components/sections/LoginForm";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <main id="conteudo" className="min-h-dvh lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <LoginBrandPanel />
      <div className="relative z-10 -mt-8 flex justify-center rounded-t-2xl px-4 pt-0 pb-8 lg:mt-0 lg:items-center lg:px-10 lg:py-6">
        <LoginForm />
      </div>
    </main>
  );
}
