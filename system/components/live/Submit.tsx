"use client";
import { useFormStatus } from "react-dom";
export function Submit({
  children = "Salvar",
}: {
  children?: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <button className="live-button" type="submit" disabled={pending}>
      {pending ? "Enviando…" : children}
    </button>
  );
}
