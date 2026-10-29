// app/m/android/page.tsx
import { redirect } from "next/navigation";
import { mobilePath } from "@/lib/mobile/platform";

/** /m/android → Início (the proxy sends anonymous visitors to the login first). */
export default function AndroidIndex() {
  redirect(mobilePath("android", "home"));
}
