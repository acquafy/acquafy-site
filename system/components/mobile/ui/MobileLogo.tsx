// components/mobile/ui/MobileLogo.tsx
import Image from "next/image";
import { cn } from "@/lib/cn";

/** Acquafy logo: the coloured one in Dia, the white one in Noite (both are in the DOM; `dark:` picks one). */
export function MobileLogo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={cn("inline-block shrink-0", className)}>
      <Image src="/brand/acquafy-logo.webp" alt="Acquafy" width={560} height={93} priority={priority} sizes="180px" className="h-full w-auto dark:hidden" />
      <Image src="/brand/acquafy-logo-white.webp" alt="Acquafy" width={640} height={106} priority={priority} sizes="180px" className="hidden h-full w-auto dark:block" />
    </span>
  );
}
