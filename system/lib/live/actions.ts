"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { context, accountCookie } from "./data";

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}
function finish(
  path: string,
  error: boolean,
  reason = "",
  ticket = "",
  page = "",
): never {
  revalidatePath("/", "layout");
  redirect(
    `/${path}?${error ? "error=" + (reason || "save") : "saved=1"}${ticket ? "&ticket=" + encodeURIComponent(ticket) : ""}${page ? "&page=" + encodeURIComponent(page) : ""}`,
  );
}
export async function switchAccount(form: FormData) {
  const ctx = await context();
  const id = text(form, "account_id");
  // An administrator leaves the selected account by choosing the global view (empty value).
  if (!id && ctx.staff === "admin") {
    (await cookies()).set(accountCookie, "", { path: "/app", maxAge: 0 });
    revalidatePath("/", "layout");
    redirect("/painel");
  }
  if (!ctx.accounts.some((a) => a.id === id)) finish("home", true);
  await rememberAccount(id);
  revalidatePath("/", "layout");
  redirect(text(form, "next") === "admin" && ctx.staff === "admin" ? "/admin" : "/home");
}
async function rememberAccount(id: string) {
  (await cookies()).set(accountCookie, id, {
    path: "/app",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
/** Suspend or reactivate from the account directory, where no account has to be open first. */
export async function setAccountStatus(form: FormData) {
  const ctx = await context();
  if (ctx.staff !== "admin") finish("home", true);
  const status = text(form, "status");
  if (status !== "active" && status !== "suspended") finish("contas", true);
  const { error } = await ctx.db.rpc("portal_admin", {
    action: "account_status",
    payload: { account_id: text(form, "account_id"), status },
  });
  if (error)
    console.error("portal_admin failed", {
      action: "account_status",
      code: error.code,
    });
  finish("contas", !!error);
}
export async function logout() {
  const { db } = await context();
  const { error } = await db.auth.signOut({ scope: "local" });
  if (error) finish("perfil", true);
  const jar = await cookies();
  jar.set(accountCookie, "", { path: "/app", maxAge: 0 });
  jar.set("acq-remember", "", { path: "/app", maxAge: 0 });
  redirect("/login");
}
export async function ticketAction(form: FormData) {
  const { db, account, staff } = await context();
  const destination =
    staff && text(form, "queue") === "1" ? "equipe" : "suporte";
  const action = text(form, "action");
  if (!["create", "reply", "status"].includes(action)) finish("suporte", true);
  if (
    action === "create" &&
    (!account || account.id !== text(form, "account_id"))
  )
    finish("suporte", true, "account");
  const payload = {
    account_id: account?.id,
    ticket_id: text(form, "ticket_id"),
    subject: text(form, "subject"),
    body: text(form, "body"),
    status: text(form, "status"),
  };
  const { error } = await db.rpc("portal_ticket", { action, payload });
  finish(destination, !!error, "", text(form, "ticket_id"), text(form, "page"));
}
export async function adminAction(form: FormData) {
  const ctx = await context();
  if (ctx.staff !== "admin") finish("home", true);
  const action = text(form, "action");
  const allowed = [
    "account",
    "account_status",
    "membership",
    "contract",
    "purifier",
    "payout",
    "settle_payout",
    "unit_status",
  ];
  if (!allowed.includes(action)) finish("admin", true);
  if (
    action !== "account" &&
    (!ctx.account || ctx.account.id !== text(form, "account_id"))
  )
    finish("admin", true, "account");
  const payload = Object.fromEntries(
    [...form.entries()].filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
  const { data, error } = await ctx.db.rpc("portal_admin", { action, payload });
  if (error) {
    console.error("portal_admin failed", { action, code: error.code });
    finish("admin", true, error.code === "23505" ? "duplicate" : "save");
  }
  // A new account opens right away, so its contract, member and document forms are on screen.
  if (action === "account" && data) await rememberAccount(String(data));
  finish("admin", false);
}
export async function uploadDocument(form: FormData) {
  const { db, staff, account } = await context();
  if (staff !== "admin" || !account || account.id !== text(form, "account_id"))
    finish("admin", true, "account");
  const file = form.get("file");
  if (
    !(file instanceof File) ||
    file.type !== "application/pdf" ||
    file.size < 1 ||
    file.size > 10 * 1024 * 1024 ||
    text(form, "title").length < 2
  )
    finish("admin", true, "file");
  const buffer = new Uint8Array(await file.arrayBuffer());
  if (new TextDecoder().decode(buffer.slice(0, 5)) !== "%PDF-")
    finish("admin", true, "file");
  const objectPath = `${account.id}/${crypto.randomUUID()}.pdf`;
  const { error: uploadError } = await db.storage
    .from("portal-documents")
    .upload(objectPath, buffer, {
      contentType: "application/pdf",
      upsert: false,
    });
  if (uploadError) finish("admin", true, "file");
  const { error } = await db.rpc("portal_admin", {
    action: "document",
    payload: {
      account_id: account.id,
      contract_id: text(form, "contract_id"),
      title: text(form, "title"),
      filename: file.name,
      size_bytes: file.size,
      object_path: objectPath,
    },
  });
  if (error) {
    await db.storage.from("portal-documents").remove([objectPath]);
    finish("admin", true);
  }
  finish("admin", false);
}
