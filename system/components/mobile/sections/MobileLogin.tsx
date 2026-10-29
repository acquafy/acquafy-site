// components/mobile/sections/MobileLogin.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { useFlowSplit } from "@/components/mobile/sections/MobileFlowSplit";
import { usePlatform } from "@/components/mobile/PlatformProvider";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileCheckbox, MobileTextField } from "@/components/mobile/ui/MobileFields";
import { MobileLogo } from "@/components/mobile/ui/MobileLogo";
import { useToast } from "@/components/providers/ToastProvider";
import { isEmail } from "@/components/ui/validate";
import { loginCopy } from "@/config/login-page";
import { signIn } from "@/lib/auth";
import { cn } from "@/lib/cn";
import { mobilePath } from "@/lib/mobile/platform";
import { MobileLoginAccessSheet } from "./MobileLoginAccessSheet";
import { MobileLoginForgotSheet } from "./MobileLoginForgotSheet";

type Errors = { email?: string; password?: string };

/** Login screen: brand hero on top, the form card below (e-mail, password, remember me, "Esqueci", "Entrar", "Criar conta"). */
export function MobileLogin() {
  const router = useRouter();
  const platform = usePlatform();
  const split = useFlowSplit();
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sheet, setSheet] = useState<"none" | "forgot" | "access">("none");

  const focusField = (name: "email" | "password") => form.current?.querySelector<HTMLInputElement>(`input[name="${name}"]`)?.focus();

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (loading) return;

    const next: Errors = {};
    if (!email.trim()) next.email = "Informe seu e-mail.";
    else if (!isEmail(email)) next.email = "Informe um e-mail válido, como nome@dominio.com.";
    if (!password) next.password = "Informe sua senha.";
    setErrors(next);
    if (next.email || next.password) {
      focusField(next.email ? "email" : "password");
      return;
    }

    setLoading(true);
    const result = await signIn({ email, password, remember });
    if (!result.ok) {
      setLoading(false);
      setErrors({ password: loginCopy.invalidCredentials });
      focusField("password");
      return;
    }
    toast({ title: "Bem-vindo de volta!", description: "Acesso liberado ao Portal do Investidor." });
    router.replace(mobilePath(platform, "home"));
    router.refresh();
  };

  return (
    <main className="flex h-(--m-frame-h) min-h-0 flex-col justify-center pb-(--m-safe-bottom)">
      <section className={cn("relative px-5 pt-[calc(var(--m-safe-top)+12px)] pb-4", split && "hidden")}>
        <div className="flex justify-center">
          <MobileLogo className="h-9" priority />
        </div>
      </section>

      <section aria-label="Entrar" className={cn("px-5 pt-2 pb-5", split && "px-0")}>
        <div className="mb-6">
          <h2 className="text-[28px] leading-tight font-extrabold tracking-tight text-ink">{loginCopy.formTitle}</h2>
          <p className="mt-1 text-[16px] text-ink-soft">{loginCopy.formSubtitle}</p>
        </div>
        <form ref={form} method="post" noValidate onSubmit={onSubmit} aria-label="Entrar no portal" className="grid gap-3.5">
          <MobileTextField
            label="E-mail"
            name="email"
            type="email"
            icon={Mail}
            autoComplete="username"
            inputMode="email"
            autoCapitalize="none"
            placeholder="seu@email.com"
            value={email}
            error={errors.email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((x) => ({ ...x, email: undefined }));
            }}
          />
          <MobileTextField
            label="Senha"
            name="password"
            type="password"
            icon={Lock}
            autoComplete="current-password"
            placeholder="Sua senha"
            value={password}
            error={errors.password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((x) => ({ ...x, password: undefined }));
            }}
          />

          <div className="flex items-center justify-between gap-3">
            <MobileCheckbox label="Lembrar-me" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <button
              type="button"
              onClick={() => setSheet("forgot")}
              className="min-h-11 rounded-md text-[15px] font-semibold text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:opacity-60"
            >
              Esqueci minha senha
            </button>
          </div>

          <MobileButton type="submit" size="lg" full loading={loading}>
            {loading ? "Entrando…" : "Entrar"}
            {!loading && <ArrowRight className="size-5" aria-hidden="true" />}
          </MobileButton>
          <MobileButton variant="secondary" size="lg" full onClick={() => setSheet("access")}>
            <UserPlus className="size-5" aria-hidden="true" />
            Criar conta
          </MobileButton>
        </form>

        <div className="mt-4 flex items-start gap-3 rounded-[12px] bg-canvas/70 p-3.5">
          <ShieldCheck className="mt-0.5 size-6 shrink-0 text-violet" strokeWidth={1.75} aria-hidden="true" />
          <p className="text-[13px] leading-snug text-ink-soft">
            <strong className="block text-[14.5px] text-ink">{loginCopy.secureTitle}</strong>
            {loginCopy.secureText}
          </p>
        </div>
        <p className="mt-3 text-center text-[12.5px] text-ink-mute">{loginCopy.demoHint}</p>
      </section>

      <MobileLoginForgotSheet open={sheet === "forgot"} initialEmail={email} onClose={() => setSheet("none")} />
      <MobileLoginAccessSheet open={sheet === "access"} onClose={() => setSheet("none")} />
    </main>
  );
}
