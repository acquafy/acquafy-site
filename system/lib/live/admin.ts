import "server-only";
import { notFound } from "next/navigation";
import { serviceClient } from "@/lib/enrollment/server";
import { context } from "./data";
import { APPLICATIONS_STAGE, enrollmentStages, orderStages, workQueues } from "./admin-view";

/** Every global screen starts here. RLS is what protects the data; this keeps the screen itself from other roles. */
export async function requireAdmin() {
  const ctx = await context();
  if (ctx.staff !== "admin") notFound();
  return ctx;
}

type CountResult = PromiseLike<{ count: number | null; error: unknown }>;

async function count(query: CountResult) {
  const { count: total, error } = await query;
  if (error) throw new Error("Não foi possível carregar os indicadores.");
  return total ?? 0;
}

/** Reads every row across PostgREST's 1000-row page limit, so a total can never be silently truncated. */
async function allRows<T>(page: (from: number, to: number) => PromiseLike<{ data: unknown; error: unknown }>) {
  const rows: T[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await page(from, from + 999);
    if (error) throw new Error("Não foi possível carregar os indicadores.");
    rows.push(...(data as T[]));
    if ((data as T[]).length < 1000) return rows;
  }
}

/**
 * E-mails of the given users. `auth.users` is not exposed to clients, so this uses the server-only Auth Admin API
 * and must only run after `requireAdmin()`. Screens stay usable (without e-mails) if the key is not configured.
 */
export async function userEmails(ids: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(ids)];
  const emails = new Map<string, string>();
  if (!unique.length) return emails;
  await requireAdmin();
  try {
    const service = serviceClient();
    const users = await Promise.all(unique.map((id) => service.auth.admin.getUserById(id)));
    users.forEach(({ data }, n) => {
      if (data.user?.email) emails.set(unique[n], data.user.email);
    });
  } catch (error) {
    console.error("Admin e-mail lookup unavailable", { kind: error instanceof Error ? error.name : "error" });
  }
  return emails;
}

/** Figures and work queues of the global panel, across every account. */
export async function adminOverview() {
  const { db } = await requireAdmin();
  const head = (table: string) => db.from(table).select("*", { count: "exact", head: true });
  const today = new Date().toISOString().slice(0, 10);
  const statuses = (stages: typeof orderStages, key: string) => stages.find((s) => s.key === key)!.statuses;

  const [accounts, suspended, applications, enrollmentReview, enrollmentPayment, ordersToQuote, ordersToFulfill, ordersPayment, ticketsOpen, contracts, payouts, leases, assigned] = await Promise.all([
    count(head("accounts")),
    count(head("accounts").eq("status", "suspended")),
    count(head("investor_applications").is("enrollment_id", null)),
    count(head("investor_enrollments").in("status", statuses(enrollmentStages, "analise"))),
    count(head("investor_enrollments").in("status", statuses(enrollmentStages, "pagamento"))),
    count(head("product_orders").in("status", statuses(orderStages, "proposta"))),
    count(head("product_orders").in("status", statuses(orderStages, "entrega"))),
    count(head("product_orders").in("status", statuses(orderStages, "pagamento"))),
    count(head("support_tickets").eq("status", "open")),
    allRows<{ account_id: string; status: string; invested_amount: number }>((from, to) => db.from("contracts").select("account_id,status,invested_amount").order("id").range(from, to)),
    allRows<{ amount: number; due_on: string }>((from, to) => db.from("payouts").select("amount,due_on").eq("status", "scheduled").order("id").range(from, to)),
    allRows<{ id: string; status: string; installed_at: string | null }>((from, to) => db.from("customer_leases").select("id,status,installed_at").order("id").range(from, to)),
    allRows<{ lease_id: string }>((from, to) => db.from("lease_units").select("lease_id").order("lease_id").order("purifier_id").range(from, to)),
  ]);

  const allocated = new Set(assigned.map((u) => u.lease_id));
  return {
    accounts,
    suspended,
    // Same rule as portal_summary: drafts are not registered investment.
    invested: contracts.filter((c) => c.status !== "draft").reduce((sum, c) => sum + Number(c.invested_amount), 0),
    investors: new Set(contracts.filter((c) => c.status === "active").map((c) => c.account_id)).size,
    scheduled: payouts.reduce((sum, p) => sum + Number(p.amount), 0),
    overdue: payouts.filter((p) => p.due_on < today).length,
    queues: workQueues({
      applications,
      enrollmentReview,
      enrollmentPayment,
      ordersToQuote,
      ordersToFulfill,
      ordersPayment,
      ticketsOpen,
      leasesToAllocate: leases.filter((l) => l.status === "offered" && !allocated.has(l.id)).length,
      leasesToInstall: leases.filter((l) => l.status === "active" && !l.installed_at).length,
      leasesWithIssues: leases.filter((l) => l.status === "past_due" || l.status === "review").length,
    }),
  };
}

/** How many records each investor-pipeline tab holds. */
export async function investorStageCounts() {
  const { db } = await requireAdmin();
  const head = (table: string) => db.from(table).select("*", { count: "exact", head: true });
  const [applications, ...stages] = await Promise.all([
    count(head("investor_applications").is("enrollment_id", null)),
    ...enrollmentStages.map((stage) => count(head("investor_enrollments").in("status", stage.statuses))),
  ]);
  return { [APPLICATIONS_STAGE]: applications, ...Object.fromEntries(enrollmentStages.map((stage, n) => [stage.key, stages[n]])) } as Record<string, number>;
}

/** How many orders each order tab holds. */
export async function orderStageCounts() {
  const { db } = await requireAdmin();
  const counts = await Promise.all(orderStages.map((stage) => count(db.from("product_orders").select("*", { count: "exact", head: true }).in("status", stage.statuses))));
  return Object.fromEntries(orderStages.map((stage, n) => [stage.key, counts[n]])) as Record<string, number>;
}
