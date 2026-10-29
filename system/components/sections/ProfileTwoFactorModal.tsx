// components/sections/ProfileTwoFactorModal.tsx
"use client";

import { useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { useFocusOnOpen } from "@/components/ui/useFocusOnOpen";
import { digitsOnly } from "@/components/ui/validate";
import { MOCK_TWO_FACTOR_CODE, TWO_FACTOR_SECRET } from "@/config/profile-page";

const FORM_ID = "perfil-2fa-form";
const GRID = 25;

/** Deterministic pseudo-QR (placeholder, not scannable): three finder squares plus seeded noise. */
function qrCells(): { x: number; y: number }[] {
  const cells: { x: number; y: number }[] = [];
  let seed = 20261026;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x >= GRID - 8 && y < 8) || (x < 8 && y >= GRID - 8);
  for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) if (!inFinder(x, y) && rand() > 0.52) cells.push({ x, y });
  return cells;
}

const CELLS = qrCells();

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="7" height="7" rx="1.2" fill="#0a1f7a" />
      <rect x={x + 1} y={y + 1} width="5" height="5" rx="0.8" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx="0.6" fill="#1f66ff" />
    </g>
  );
}

function QrPlaceholder() {
  return (
    <svg viewBox={`-1 -1 ${GRID + 2} ${GRID + 2}`} role="img" aria-label="QR Code de demonstração para o aplicativo autenticador" className="size-40 rounded-xl border border-line bg-white p-2">
      {CELLS.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width="1" height="1" fill="#0a1f7a" opacity="0.88" />
      ))}
      <Finder x={0} y={0} />
      <Finder x={GRID - 7} y={0} />
      <Finder x={0} y={GRID - 7} />
    </svg>
  );
}

export function ProfileTwoFactorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { updateProfile } = useProfile();
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const [checking, setChecking] = useState(false);
  useFocusOnOpen(open, form);

  const close = () => {
    setCode("");
    setError(undefined);
    setChecking(false);
    onClose();
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (code.length !== 6) {
      setError("Digite os 6 dígitos do código do aplicativo.");
      return;
    }
    setChecking(true);
    window.setTimeout(() => {
      if (code !== MOCK_TWO_FACTOR_CODE) {
        setChecking(false);
        setError("Código inválido. Confira o aplicativo autenticador e tente novamente.");
        return;
      }
      updateProfile({ twoFactor: true });
      toast({ title: "Autenticação em duas etapas ativada", description: "Pediremos um código a cada novo acesso." });
      close();
    }, 600);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Ativar autenticação em duas etapas"
      description="Escaneie o QR Code no seu aplicativo autenticador e digite o código de 6 dígitos."
      footer={
        <>
          <Button variant="outline" onClick={close} disabled={checking}>
            Cancelar
          </Button>
          <Button type="submit" form={FORM_ID} loading={checking}>
            <ShieldCheck className="size-4" aria-hidden="true" />
            Verificar e ativar
          </Button>
        </>
      }
    >
      <form ref={form} id={FORM_ID} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="grid justify-items-center gap-2">
          <QrPlaceholder />
          <p className="text-center text-[12.5px] text-ink-soft">
            Ou digite a chave:
            <br />
            <strong className="tabular font-mono text-[13px] tracking-wider text-ink">{TWO_FACTOR_SECRET}</strong>
          </p>
        </div>
        <TextField
          label="Código de verificação"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="000000"
          className="text-center text-[20px] font-bold tracking-[0.4em]"
          hint={error ? undefined : `Demonstração: use o código ${MOCK_TWO_FACTOR_CODE}.`}
          value={code}
          error={error}
          onChange={(e) => {
            setCode(digitsOnly(e.target.value));
            setError(undefined);
          }}
        />
      </form>
    </Modal>
  );
}
