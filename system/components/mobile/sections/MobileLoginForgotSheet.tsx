"use client";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";

export function MobileLoginForgotSheet({ open, onClose }: { open: boolean; initialEmail: string; onClose: () => void }) {
  return (
    <MobileSheet open={open} onClose={onClose} title="Recuperar acesso" footer={<MobileButton onClick={onClose}>Voltar ao login</MobileButton>}>
      <p className="text-[15px] text-ink-soft">Solicite a redefinição de senha ao responsável pela sua conta na Acquafy.</p>
    </MobileSheet>
  );
}
