// components/ui/Avatar.tsx
import Image from "next/image";
import { cn } from "@/lib/cn";

type AvatarProps = {
  name: string;
  /** Uploaded picture (data URL or path). Falls back to the initials. */
  src?: string | null;
  className?: string;
};

export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return ((parts[0][0] ?? "") + (parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "")).toUpperCase();
}

export function Avatar({ name, src, className = "size-11 text-sm" }: AvatarProps) {
  if (src) {
    return <Image src={src} alt="" width={96} height={96} unoptimized className={cn("shrink-0 rounded-full object-cover", className)} />;
  }
  return (
    <span aria-hidden="true" className={cn("grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#1f66ff] to-[#7c3aed] font-bold text-white", className)}>
      {initialsOf(name)}
    </span>
  );
}
