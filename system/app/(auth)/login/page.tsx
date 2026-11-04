// app/(auth)/login/page.tsx
import Link from "next/link";
import { customerDestination } from "@/lib/orders/destination";
import type { Metadata } from "next";
import { LoginBrandPanel } from "@/components/sections/LoginBrandPanel";
import { LoginForm } from "@/components/sections/LoginForm";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = (await searchParams).next;
  const destination = next
    ? customerDestination(next.startsWith("/") ? next : "/" + next)
    : "/pedidos";
  return (
    <main
      id="conteudo"
      className="min-h-dvh lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
    >
      <LoginBrandPanel />
      <div className="relative z-10 -mt-8 flex justify-center rounded-t-2xl px-4 pt-0 pb-8 lg:mt-0 lg:items-center lg:px-10 lg:py-6">
        <div>
          <LoginForm destination={destination} />
          <p className="mt-4 text-center">
            <Link href={"/cadastro?next=" + encodeURIComponent(destination)}>
              Novo cliente? Crie sua Acquafy Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
