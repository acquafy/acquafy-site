// app/(auth)/layout.tsx
//
// Public screens (login). They sit outside the portal shell, so the toast provider lives here too.
import { ToastProvider } from "@/components/providers/ToastProvider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
