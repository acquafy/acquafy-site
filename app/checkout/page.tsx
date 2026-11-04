import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CheckinMain from "@/components/CheckinMain";
import { buyNow } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Finalizar Compra — Acquafy",
  description: "Conclua seu pedido com segurança.",
};

// Evaluated per request: the Buy Now flag decides whether the purchase flow exists at all.
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  if (!(await buyNow())) notFound();
  return (
    <>
      <Header />
      <main>
        <CheckinMain />
      </main>
    </>
  );
}
