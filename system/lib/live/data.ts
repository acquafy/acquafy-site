import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { portalRole } from "@/lib/portal-access";
import { selectAccount } from "./admin-view";

export type Account = { id: string; name: string; status: string };
export type Contract = {
  id: string;
  number: string;
  title: string;
  status: string;
  starts_on: string;
  ends_on: string;
  invested_amount: number;
};
export type Unit = {
  id: string;
  serial: string;
  model: string;
  status: string;
  city: string;
  state: string;
  activation_date: string | null;
};
export type Payout = {
  id: string;
  period_start: string;
  period_end: string;
  due_on: string;
  amount: number;
  status: string;
  settled_on: string | null;
  reference: string | null;
};
export type Document = {
  id: string;
  title: string;
  filename: string;
  created_at: string;
  size_bytes: number;
};
export type Ticket = {
  id: string;
  number: number;
  account_id: string;
  subject: string;
  status: string;
  assigned_to: string | null;
  updated_at: string;
};
export type Message = {
  id: string;
  ticket_id: string;
  from_staff: boolean;
  body: string;
  created_at: string;
};
export const accountCookie = "acq-account";

export async function serverClient() {
  const jar = await cookies();
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookieOptions: {
        path: "/app",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
      cookies: {
        getAll: () => jar.getAll(),
        setAll(values) {
          try {
            for (const { name, value, options } of values)
              jar.set(name, value, {
                ...options,
                ...(jar.get("acq-remember")?.value === "0" &&
                options.maxAge !== 0
                  ? { maxAge: undefined, expires: undefined }
                  : {}),
              });
          } catch {
            /* Server Components cannot set cookies; proxy refreshes them before rendering. */
          }
        },
      },
    },
  );
}

export const context = cache(async () => {
  const db = await serverClient();
  const {
    data: { user },
    error,
  } = await db.auth.getUser();
  if (error || !user || !portalRole(user)) redirect("/login");
  const [accounts, grant] = await Promise.all([
    db.from("accounts").select("id,name,status").order("name"),
    db
      .from("staff_role_grants")
      .select("user_id,role")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);
  if (accounts.error || grant.error)
    throw new Error("Não foi possível carregar as contas. Tente novamente.");
  const visible = accounts.data as Account[];
  const chosen = (await cookies()).get(accountCookie)?.value;
  const staff =
    user.app_metadata.portal_role === "internal"
      ? (grant.data?.role as "admin" | "support" | undefined)
      : undefined;
  const account = selectAccount(visible, chosen, staff);
  return { db, user, accounts: visible, account, staff };
});

export async function records<T>(
  table:
    "contracts" | "purifiers" | "payouts" | "documents" | "support_tickets",
  accountId: string,
  page = 0,
) {
  const { db } = await context();
  const { data, error, count } = await db
    .from(table)
    .select("*", { count: "exact" })
    .eq("account_id", accountId)
    .order("created_at", { ascending: false })
    .order("id")
    .range(page * 50, page * 50 + 49);
  if (error)
    throw new Error("Não foi possível carregar os registros. Tente novamente.");
  return { rows: data as T[], count: count ?? 0 };
}
export const money = (amount: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "USD" }).format(
    Number(amount),
  );
export const date = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
        new Date(value.length === 10 ? value + "T12:00:00Z" : value),
      )
    : "—";
export const labels: Record<string, string> = {
  active: "Ativo",
  suspended: "Suspenso",
  draft: "Minuta",
  ended: "Encerrado",
  available: "Disponível",
  operation: "Em operação",
  maintenance: "Em manutenção",
  retired: "Retirado",
  scheduled: "Programado",
  settled: "Liquidado",
  open: "Aberto",
  in_progress: "Em atendimento",
  resolved: "Resolvido",
};
