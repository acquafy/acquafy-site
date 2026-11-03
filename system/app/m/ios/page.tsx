// app/m/ios/page.tsx
import { redirect } from "next/navigation";
import { mobilePath } from "@/lib/mobile/platform";

/** /m/ios → Início (the proxy sends anonymous visitors to the login first). */
export default function IosIndex() {
  redirect(mobilePath("ios", "home"));
}
