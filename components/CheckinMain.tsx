"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { PRODUCT_CATALOG } from "@/lib/products";
import { useLang } from "@/context/LanguageContext";
export default function CheckinMain() {
  const { cart, removeFromCart, updateQty } = useCart();
  const { lang } = useLang();
  const pt = lang.startsWith("pt");
  const items = cart.map((i) => ({ product: i.id, quantity: i.qty }));
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 text-[#1f2e91]">
      <h1 className="text-3xl font-bold">{pt ? "Seu pedido" : "Your order"}</h1>
      <p className="my-5">
        {pt
          ? "Confirme os produtos e continue com sua Acquafy Account. Você receberá uma proposta com frete, disponibilidade e condições antes do pagamento."
          : "Confirm your products and continue with your Acquafy Account. You will receive a quote with delivery costs, availability and terms before payment."}
      </p>
      {cart.map((i) => (
        <div
          className="my-4 flex flex-wrap items-center gap-5 rounded-xl border p-5"
          key={i.id}
        >
          <span>
            {PRODUCT_CATALOG.find((p) => p.id === i.id)?.label ?? i.id}
          </span>
          <label>
            {pt ? "Quantidade" : "Quantity"}{" "}
            <input
              className="w-20 border p-2"
              type="number"
              min={1}
              max={100}
              value={i.qty}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isInteger(n) && n >= 1 && n <= 100)
                  updateQty(i.id, n - i.qty);
              }}
            />
          </label>
          <button onClick={() => removeFromCart(i.id)}>
            {pt ? "Remover" : "Remove"}
          </button>
        </div>
      ))}
      {cart.length ? (
        <div className="my-8 flex gap-6">
          <a
            className="rounded-lg bg-[#0233c3] px-6 py-3 text-white"
            href={
              "/app/pedido?" +
              new URLSearchParams({
                mode: "purchase",
                items: JSON.stringify(items),
              })
            }
          >
            {pt ? "Solicitar compra" : "Request purchase"}
          </a>
          <a
            className="rounded-lg border px-6 py-3"
            href={
              "/app/pedido?" +
              new URLSearchParams({
                mode: "lease",
                items: JSON.stringify(items),
              })
            }
          >
            {pt ? "Solicitar locação" : "Request lease"}
          </a>
        </div>
      ) : (
        <p>{pt ? "Seu carrinho está vazio." : "Your cart is empty."}</p>
      )}
      <Link href="/buy">{pt ? "Ver produtos" : "Browse products"}</Link>
    </section>
  );
}
