// Acquafy Account auth e-mails (pt-BR) and the Supabase Auth settings they depend on, kept as code.
//
//   node scripts/supabase-auth-emails.mjs preview      writes the 13 HTML files to <os tmp>/acquafy-email-preview (open in a browser)
//   node scripts/supabase-auth-emails.mjs apply        PATCHes subjects, templates and site_url on the hosted project
//
// `apply` needs a Supabase management token in the file named by SUPABASE_ACCESS_TOKEN_FILE. Templates keep Supabase's
// Go-template variables ({{ .ConfirmationURL }}, {{ .Token }}, ...). Nothing here touches SMTP credentials.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const PROJECT = "zfxyprckbcwzscyttwyq";
const SITE_URL = "https://www.acquafy.com";

const INK = "#0a1f7a";
const SOFT = "#3f4f95";
const BRAND = "#1f66ff";
const VIOLET = "#7c3aed";
const CANVAS = "#eaf3ff";
const LINE = "#e2eafa";

/** Shared shell: wordmark, white card on the portal's light-blue canvas, gradient button, quiet footer. */
function layout({ title, body, button, note }) {
  const cta = button
    ? `<tr><td style="padding:8px 0 4px"><a href="${button.href}" style="display:inline-block;padding:14px 28px;border-radius:8px;background:${BRAND};background-image:linear-gradient(90deg,${BRAND},${VIOLET});color:#ffffff;font-weight:700;font-size:16px;text-decoration:none">${button.label}</a></td></tr>
       <tr><td style="padding:16px 0 0;font-size:13px;line-height:1.5;color:${SOFT}">Se o botão não abrir, copie e cole este endereço no navegador:<br><a href="${button.href}" style="color:${BRAND};word-break:break-all">${button.href}</a></td></tr>`
    : "";
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background:${CANVAS};font-family:Inter,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CANVAS};padding:32px 12px"><tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
    <tr><td style="padding:0 4px 20px;font-size:22px;font-weight:800;letter-spacing:4px;color:${INK}">ACQUAFY <span style="font-size:12px;font-weight:600;letter-spacing:1px;color:${SOFT}">ACCOUNT</span></td></tr>
    <tr><td style="background:#ffffff;border:1px solid ${LINE};border-radius:12px;padding:32px 28px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="font-size:24px;line-height:1.25;font-weight:800;color:${INK};padding-bottom:12px">${title}</td></tr>
        <tr><td style="font-size:16px;line-height:1.55;color:${SOFT};padding-bottom:16px">${body}</td></tr>
        ${cta}
        ${note ? `<tr><td style="height:20px;line-height:20px;font-size:0">&nbsp;</td></tr><tr><td style="padding:16px 0 0;font-size:13px;line-height:1.5;color:${SOFT};border-top:1px solid ${LINE}">${note}</td></tr>` : ""}
      </table>
    </td></tr>
    <tr><td style="padding:16px 4px 0;font-size:12px;line-height:1.5;color:${SOFT}">Mensagem automática da Acquafy Account. Não responda a este e-mail. Se você não reconhece esta ação, pode ignorá-lo com segurança.</td></tr>
  </table>
</td></tr></table></body></html>`;
}

const IGNORE = "Se você não fez esta solicitação, ignore este e-mail: nada será alterado na sua conta.";
const SUPPORT = "Se você não fez esta alteração, redefina sua senha e fale com a equipe Acquafy imediatamente.";
const url = "{{ .ConfirmationURL }}";

export const emails = {
  confirmation: {
    subject: "Confirme seu e-mail na Acquafy Account",
    html: layout({
      title: "Confirme seu e-mail",
      body: "Falta só um passo para ativar sua Acquafy Account e acompanhar pedidos, entrega, instalação e locações.",
      button: { label: "Confirmar e-mail", href: url },
      note: IGNORE,
    }),
  },
  invite: {
    subject: "Você foi convidado para a Acquafy Account",
    html: layout({
      title: "Você recebeu um convite",
      body: "A equipe Acquafy convidou você para acessar a Acquafy Account. Aceite o convite para definir sua senha e continuar.",
      button: { label: "Aceitar convite", href: url },
      note: "Se você não esperava este convite, ignore este e-mail.",
    }),
  },
  magic_link: {
    subject: "Seu link de acesso à Acquafy Account",
    html: layout({
      title: "Seu link de acesso",
      body: "Use o botão abaixo para entrar na sua Acquafy Account. O link é de uso único e expira em pouco tempo.",
      button: { label: "Entrar na minha conta", href: url },
      note: IGNORE,
    }),
  },
  recovery: {
    subject: "Redefina sua senha da Acquafy Account",
    html: layout({
      title: "Redefina sua senha",
      body: "Recebemos um pedido para redefinir a senha da sua Acquafy Account. Clique no botão para criar uma nova senha.",
      button: { label: "Criar nova senha", href: url },
      note: IGNORE,
    }),
  },
  email_change: {
    subject: "Confirme seu novo e-mail da Acquafy Account",
    html: layout({
      title: "Confirme seu novo e-mail",
      body: "Para usar {{ .NewEmail }} como o e-mail da sua Acquafy Account, confirme a alteração abaixo.",
      button: { label: "Confirmar novo e-mail", href: url },
      note: IGNORE,
    }),
  },
  reauthentication: {
    subject: "{{ .Token }} é seu código de verificação Acquafy",
    html: layout({
      title: "Seu código de verificação",
      body: `Use o código abaixo para confirmar sua identidade. Ele expira em pouco tempo.<br><span style="display:inline-block;margin-top:16px;padding:12px 20px;border-radius:8px;background:${CANVAS};font-size:28px;font-weight:800;letter-spacing:6px;color:${INK}">{{ .Token }}</span>`,
      note: "Nunca compartilhe este código. A equipe Acquafy não pede códigos por telefone ou mensagem.",
    }),
  },
  password_changed_notification: {
    subject: "Sua senha da Acquafy Account foi alterada",
    html: layout({ title: "Sua senha foi alterada", body: "A senha da sua Acquafy Account foi alterada há pouco.", note: SUPPORT }),
  },
  email_changed_notification: {
    subject: "O e-mail da sua Acquafy Account foi alterado",
    html: layout({
      title: "Seu e-mail foi alterado",
      body: "O e-mail da sua Acquafy Account mudou de {{ .OldEmail }} para {{ .Email }}.",
      note: SUPPORT,
    }),
  },
  phone_changed_notification: {
    subject: "O telefone da sua Acquafy Account foi alterado",
    html: layout({ title: "Seu telefone foi alterado", body: "O telefone da sua Acquafy Account foi alterado há pouco.", note: SUPPORT }),
  },
  mfa_factor_enrolled_notification: {
    subject: "Um novo método de verificação foi adicionado à sua conta",
    html: layout({
      title: "Novo método de verificação",
      body: "O método de verificação {{ .FactorType }} foi adicionado à sua Acquafy Account.",
      note: SUPPORT,
    }),
  },
  mfa_factor_unenrolled_notification: {
    subject: "Um método de verificação foi removido da sua conta",
    html: layout({
      title: "Método de verificação removido",
      body: "O método de verificação {{ .FactorType }} foi removido da sua Acquafy Account.",
      note: SUPPORT,
    }),
  },
  identity_linked_notification: {
    subject: "Um novo método de acesso foi vinculado à sua conta",
    html: layout({
      title: "Novo método de acesso",
      body: "Sua conta {{ .Provider }} foi vinculada como método de acesso para {{ .Email }}.",
      note: SUPPORT,
    }),
  },
  identity_unlinked_notification: {
    subject: "Um método de acesso foi removido da sua conta",
    html: layout({
      title: "Método de acesso removido",
      body: "Sua conta {{ .Provider }} foi desvinculada como método de acesso para {{ .Email }}.",
      note: SUPPORT,
    }),
  },
};

const mode = process.argv[2];
if (mode === "preview") {
  const directory = path.join(os.tmpdir(), "acquafy-email-preview");
  fs.mkdirSync(directory, { recursive: true });
  for (const [name, { html }] of Object.entries(emails)) fs.writeFileSync(path.join(directory, `${name}.html`), html);
  console.log(`Wrote ${Object.keys(emails).length} previews to ${directory}`);
} else if (mode === "apply") {
  const tokenFile = process.env.SUPABASE_ACCESS_TOKEN_FILE;
  if (!tokenFile) throw new Error("Set SUPABASE_ACCESS_TOKEN_FILE to a file containing a Supabase management token");
  const token = fs.readFileSync(tokenFile, "utf8").trim();
  const body = { site_url: SITE_URL };
  for (const [name, { subject, html }] of Object.entries(emails)) {
    body[`mailer_subjects_${name}`] = subject;
    body[`mailer_templates_${name}_content`] = html;
  }
  const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT}/config/auth`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Supabase rejected the update: ${response.status} ${(await response.text()).slice(0, 300)}`);
  console.log(`Applied site_url and ${Object.keys(emails).length} e-mail templates to ${PROJECT}`);
} else {
  console.error("Usage: node scripts/supabase-auth-emails.mjs preview|apply");
  process.exit(1);
}
