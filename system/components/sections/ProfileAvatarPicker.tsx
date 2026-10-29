// components/sections/ProfileAvatarPicker.tsx
"use client";

import { useRef } from "react";
import { Camera } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/cn";

const MAX_BYTES = 5 * 1024 * 1024;
const MAX_SIDE = 256;

/** Center-crops the picture to a square, shrinks it to at most 256 px and returns a JPEG data URL. */
async function toAvatarDataUrl(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new window.Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("decode"));
      el.src = url;
    });
    const side = Math.min(img.naturalWidth, img.naturalHeight);
    const size = Math.min(MAX_SIDE, side);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas");
    ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, size, size);
    return canvas.toDataURL("image/jpeg", 0.88);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Large avatar with the camera button: validates, resizes and stores the new photo in the profile. */
export function ProfileAvatarPicker({ className }: { className?: string }) {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const input = useRef<HTMLInputElement>(null);

  const onFile = async (file: File | undefined) => {
    if (input.current) input.current.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Arquivo não suportado", description: "Escolha uma imagem (JPG, PNG ou WebP).", tone: "error" });
      return;
    }
    if (file.size > MAX_BYTES) {
      toast({ title: "Imagem muito grande", description: "O tamanho máximo da foto é 5 MB.", tone: "error" });
      return;
    }
    try {
      updateProfile({ avatar: await toAvatarDataUrl(file) });
      toast({ title: "Foto atualizada", description: "Sua nova foto já aparece no topo do portal." });
    } catch {
      toast({ title: "Não foi possível usar a imagem", description: "Tente outro arquivo.", tone: "error" });
    }
  };

  return (
    <div className={cn("relative shrink-0", className)}>
      <Avatar name={profile.name} src={profile.avatar} className="size-full text-3xl font-extrabold" />
      <input ref={input} type="file" accept="image/*" hidden aria-label="Selecionar foto do perfil" onChange={(e) => void onFile(e.target.files?.[0])} />
      <button
        type="button"
        aria-label="Alterar foto do perfil"
        title="Alterar foto do perfil"
        onClick={() => input.current?.click()}
        className="absolute right-0 bottom-0 grid size-9 place-items-center rounded-full bg-brand text-white ring-4 ring-card transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <Camera className="size-[18px]" aria-hidden="true" />
      </button>
    </div>
  );
}
