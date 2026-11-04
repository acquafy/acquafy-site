"use client";
import { useFormStatus } from "react-dom";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

/** Submit button of a server-action form: the kit's Button, busy while the action runs. */
export function Submit({
  children = "Salvar",
  variant = "primary",
  size = "md",
  className,
}: {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={variant} size={size} loading={pending} className={className}>
      {pending ? "Enviando…" : children}
    </Button>
  );
}
