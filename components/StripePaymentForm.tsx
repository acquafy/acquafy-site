"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { forwardRef, useImperativeHandle, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

export type StripeFormHandle = {
  confirmPayment: (
    amountBRL: number,
    email?: string
  ) => Promise<{ success: boolean; intentId?: string; error?: string }>;
};

type CardInnerProps = {
  processingLabel?: string;
};

const StripeCardInner = forwardRef<StripeFormHandle, CardInnerProps>(
  function StripeCardInner({ processingLabel = "Processando pagamento..." }, ref) {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    useImperativeHandle(ref, () => ({
      async confirmPayment(amountBRL, email) {
        if (!stripe || !elements) return { success: false, error: "Stripe não inicializado" };

        setProcessing(true);
        setCardError(null);

        try {
          const res = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: Math.round(amountBRL * 100), currency: "brl" }),
          });

          if (!res.ok) throw new Error("Falha ao iniciar pagamento");
          const { clientSecret, error: apiErr } = await res.json();
          if (apiErr) throw new Error(apiErr);

          const card = elements.getElement(CardElement);
          if (!card) throw new Error("Campos do cartão não encontrados");

          const { paymentIntent, error: stripeErr } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card,
              billing_details: email ? { email } : undefined,
            },
          });

          if (stripeErr) throw new Error(stripeErr.message ?? "Erro no pagamento");
          if (paymentIntent?.status === "succeeded") return { success: true, intentId: paymentIntent.id };
          throw new Error("Pagamento não confirmado");
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : "Erro desconhecido";
          setCardError(msg);
          return { success: false, error: msg };
        } finally {
          setProcessing(false);
        }
      },
    }));

    return (
      <div className="flex flex-col gap-[12px]">
        <div
          className={`border rounded-[12px] px-[16px] py-[16px] bg-white transition-colors ${
            cardError ? "border-[#dc2626] bg-[#fff5f5]" : "border-[#cbd0d4]"
          }`}
        >
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: "16px",
                  color: "#333",
                  "::placeholder": { color: "#aab2bc" },
                },
                invalid: { color: "#dc2626" },
              },
            }}
            onChange={(e) => setCardError(e.error?.message ?? null)}
          />
        </div>

        {cardError && (
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#dc2626]">{cardError}</p>
        )}

        {processing && (
          <div className="flex items-center gap-[8px]">
            <div className="w-[16px] h-[16px] border-2 border-[#0233c3] border-t-transparent rounded-full animate-spin shrink-0" />
            <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#555]">
              {processingLabel}
            </span>
          </div>
        )}
      </div>
    );
  }
);

type StripePaymentFormProps = {
  formRef: React.RefObject<StripeFormHandle | null>;
  processingLabel?: string;
  locale?: string;
};

const STRIPE_LOCALE_MAP: Record<string, string> = {
  pt: "pt-BR", "pt-pt": "pt-PT",
  en: "en", "en-gb": "en-GB",
  es: "es", fr: "fr", de: "de",
  it: "it", zh: "zh", ja: "ja",
  ko: "ko", sv: "sv", fi: "fi",
  ru: "ru", ro: "ro", he: "iw",
};

export default function StripePaymentForm({ formRef, processingLabel, locale }: StripePaymentFormProps) {
  const stripeLocale = (locale ? STRIPE_LOCALE_MAP[locale] ?? "auto" : "auto") as "auto";
  return (
    <Elements stripe={stripePromise} options={{ locale: stripeLocale }}>
      <StripeCardInner ref={formRef} processingLabel={processingLabel} />
    </Elements>
  );
}
