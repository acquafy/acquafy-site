import { NextRequest, NextResponse } from "next/server";

export type ShippingRate = {
  id: string;
  price: number;       // BRL, decimal (e.g. 49.90)
  estimatedDays: number;
};

// ─── Integrações disponíveis ──────────────────────────────────────────────────
// Para integrar um provedor real, substitua o corpo desta função.
// Sugestões: Melhor Envio (melhorenvio.com.br), Frenet, Correios (API REST),
//            ShipBob, ou qualquer carrier via webhook.
//
// Recebe:
//   cep   — CEP de destino (somente dígitos, 8 chars)
//   items — array de { id: string; qty: number } com os produtos no carrinho
//
// Deve retornar ShippingRate[] com pelo menos o id "gratis" e/ou "express".
async function calcularFrete(
  _cep: string,
  _items: { id: string; qty: number }[]
): Promise<ShippingRate[]> {
  // ── Placeholder — substitua pela chamada real ao carrier ──────────────────
  return [
    { id: "gratis",  price: 0,     estimatedDays: 7 },
    { id: "express", price: 49.90, estimatedDays: 3 },
  ];
  // ── Exemplo Melhor Envio ──────────────────────────────────────────────────
  // const res = await fetch("https://melhorenvio.com.br/api/v2/me/shipment/calculate", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ to: { postal_code: _cep }, products: _items.map(...) }),
  // });
  // const data = await res.json();
  // return data.map((s: any) => ({ id: s.id, price: s.price, estimatedDays: s.delivery_time }));
}

export async function POST(req: NextRequest) {
  try {
    const { cep, items = [] } = await req.json();

    if (!cep || String(cep).replace(/\D/g, "").length !== 8) {
      return NextResponse.json({ error: "CEP inválido" }, { status: 400 });
    }

    const rates = await calcularFrete(String(cep).replace(/\D/g, ""), items);
    return NextResponse.json({ rates });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao calcular frete";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
