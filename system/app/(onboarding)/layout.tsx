// app/(onboarding)/layout.tsx
//
// Public sign-up and order screens. Like the login, they sit outside the portal shell, so the toast provider lives here too.
import { ToastProvider } from "@/components/providers/ToastProvider";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
