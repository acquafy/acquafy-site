// components/sections/LoginForm.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Checkbox, TextField } from "@/components/ui/Field";
import { isEmail } from "@/components/ui/validate";
import { loginCopy } from "@/config/login-page";
import { signIn } from "@/lib/auth";
import { LoginAccessModal } from "./LoginAccessModal";
import { LoginForgotModal } from "./LoginForgotModal";

type Errors = { email?: string; password?: string };

export function LoginForm() {
  const router = useRouter();
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<"none" | "forgot" | "access">("none");

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
    // Keep the button busy until the dashboard replaces this page.
    toast({ title: "Bem-vindo de volta!", description: "Acesso liberado ao Portal do Investidor." });
    router.replace("/home");
    router.refresh();
  };

  return (
    <div className="card w-full max-w-[28rem] p-6 sm:p-7 lg:rounded-xl">
      <h2 className="text-[26px] leading-tight font-extrabold tracking-tight text-ink">{loginCopy.formTitle}</h2>
      <p className="mt-1 text-[14.5px] text-ink-soft">{loginCopy.formSubtitle}</p>

      <form ref={form} method="post" noValidate onSubmit={onSubmit} aria-label="Entrar no portal" className="mt-5 grid gap-3.5">
        <TextField
          label="E-mail"
          name="email"
          type="email"
          icon={Mail}
          autoComplete="username"
          inputMode="email"
          placeholder="seu@email.com"
          value={email}
          error={errors.email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((x) => ({ ...x, email: undefined }));
          }}
        />
        <TextField
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

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <Checkbox label="Lembrar-me" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          <button
            type="button"
            onClick={() => setModal("forgot")}
            className="rounded-md text-[14.5px] font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Esqueci minha senha
          </button>
        </div>

        <Button type="submit" size="lg" loading={loading} className="w-full">
          {loading ? "Entrando…" : "Entrar"}
          {!loading && <ArrowRight className="size-5" aria-hidden="true" />}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-3 text-[13px] text-ink-mute" aria-hidden="true">
        <span className="h-px flex-1 bg-line" />
        ou
        <span className="h-px flex-1 bg-line" />
      </div>

      <Button variant="outline" size="lg" className="w-full" onClick={() => setModal("access")}>
        <UserPlus className="size-5" aria-hidden="true" />
        Criar conta
      </Button>

      <div className="mt-5 flex items-start gap-3 rounded-xl bg-canvas/70 p-3.5">
        <ShieldCheck className="mt-0.5 size-6 shrink-0 text-violet" strokeWidth={1.75} aria-hidden="true" />
        <p className="text-[13px] leading-snug text-ink-soft">
          <strong className="block text-[14px] text-ink">{loginCopy.secureTitle}</strong>
          {loginCopy.secureText}
        </p>
      </div>
      <p className="mt-3 text-center text-[12.5px] text-ink-mute">{loginCopy.demoHint}</p>

      <LoginForgotModal open={modal === "forgot"} initialEmail={email} onClose={() => setModal("none")} />
      <LoginAccessModal open={modal === "access"} onClose={() => setModal("none")} />
    </div>
  );
}
