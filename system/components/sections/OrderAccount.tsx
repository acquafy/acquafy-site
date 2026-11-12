"use client";
import { useActionState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox, TextField } from "@/components/ui/Field";
import { Notice } from "@/components/live/Notice";
import { sendOrderCode, verifyOrderCode, type OrderCodeState } from "@/lib/orders/account";

/**
 * Order page, account step: e-mail, then the 6-digit code from that e-mail, on the same page.
 * A new e-mail becomes an Acquafy Account; an existing one signs in. `next` brings the customer back to this order.
 */
export function OrderAccount({ next }: { next: string }) {
  const [sent, send, sending] = useActionState<OrderCodeState, FormData>(sendOrderCode, {});
  const [checked, verify, verifying] = useActionState<OrderCodeState, FormData>(verifyOrderCode, {});
  const email = checked.email ?? sent.email;
  const codeStep = Boolean(sent.sent && email);

  return (
    <Card title="1 · Sua Acquafy Account">
      {!codeStep ? (
        <form action={send} aria-label="Receber código por e-mail" className="grid gap-3.5">
          <p className="text-[14.5px] text-ink-soft">Informe seu e-mail. Enviamos um código de 6 números para criar sua conta ou entrar nela, sem sair desta página.</p>
          <input type="hidden" name="next" value={next} />
          <TextField name="email" label="E-mail" type="email" required maxLength={254} autoComplete="email" placeholder="seu@email.com" icon={Mail} />
          <Checkbox
            name="consent"
            value="yes"
            required
            className="items-start [&>input]:mt-0.5"
            label={
              <span>
                Li e aceito a{" "}
                <a className="font-semibold text-brand hover:underline" href="/privacy-policy" target="_blank" rel="noreferrer">
                  Política de Privacidade
                </a>
                .
              </span>
            }
          />
          {sent.error && <Notice tone="danger">{sent.error}</Notice>}
          <Button type="submit" loading={sending} size="lg" className="w-full">
            {sending ? "Enviando…" : "Receber código"}
          </Button>
        </form>
      ) : (
        <form action={verify} aria-label="Confirmar código" className="grid gap-3.5">
          <p className="text-[14.5px] text-ink-soft">
            Enviamos um e-mail para <strong className="text-ink [overflow-wrap:anywhere]">{email}</strong>. Digite o código abaixo ou toque no link do e-mail neste aparelho. Ele vale por 1 hora.
          </p>
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="next" value={next} />
          <TextField
            name="code"
            label="Código de 6 números"
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9 ]{6,7}"
            maxLength={7}
            placeholder="000000"
          />
          {checked.error && <Notice tone="danger">{checked.error}</Notice>}
          <Button type="submit" loading={verifying} size="lg" className="w-full">
            {verifying ? "Confirmando…" : "Confirmar e continuar"}
          </Button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="justify-self-start text-[14px] font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand"
          >
            Usar outro e-mail
          </button>
        </form>
      )}
    </Card>
  );
}
