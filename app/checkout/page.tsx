import type { Metadata } from "next";
import Header from "@/components/Header";
import CheckinMain from "@/components/CheckinMain";

export const metadata: Metadata = {
  title: "Finalizar Compra — Acquafy",
  description: "Conclua seu pedido com segurança.",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main>
        <CheckinMain />
      </main>
    </>
  );
}
