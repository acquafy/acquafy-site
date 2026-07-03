import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  const stripe = new Stripe(key, { apiVersion: "2026-06-24.dahlia" });

  try {
    const { amount, currency = "brl" } = await req.json();

    if (!amount || typeof amount !== "number" || amount < 50) {
      return NextResponse.json({ error: "Valor inválido" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
