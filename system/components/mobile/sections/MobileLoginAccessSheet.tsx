"use client";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";

export function MobileLoginAccessSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <MobileSheet open={open} onClose={onClose} title="Solicitar acesso" footer={<MobileButton onClick={onClose}>Voltar ao login</MobileButton>}>
      <p className="text-[15px] text-ink-soft">O portal é exclusivo para usuários internos e parceiros autorizados. Entre em contato com seu responsável na Acquafy para solicitar uma conta.</p>
    </MobileSheet>
  );
}
