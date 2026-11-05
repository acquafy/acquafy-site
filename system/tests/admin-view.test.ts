import { describe, expect, it } from "vitest";
import { enrollmentStages, literalSearch, orderStages, pageNumber, selectAccount, stageFor, workQueues } from "../lib/live/admin-view";
import { liveHome, liveNavigation } from "../config/live-navigation";

const a = { id: "a" };
const b = { id: "b" };

describe("account selection", () => {
  it("never opens an account for an administrator who did not choose one", () => {
    expect(selectAccount([a, b], undefined, "admin")).toBeNull();
    expect(selectAccount([a, b], "gone", "admin")).toBeNull();
    expect(selectAccount([a, b], "b", "admin")).toBe(b);
  });
  it("keeps the first account as the default for members and support", () => {
    expect(selectAccount([a, b], undefined, undefined)).toBe(a);
    expect(selectAccount([a, b], "gone", undefined)).toBe(a);
    expect(selectAccount([a, b], "b", "support")).toBe(b);
    expect(selectAccount([], undefined, undefined)).toBeNull();
  });
});

describe("global view stages", () => {
  it("places every enrollment status in exactly one stage", () => {
    const statuses = enrollmentStages.flatMap((s) => s.statuses).sort();
    expect(statuses).toEqual(["accepted", "active", "approved", "cancelled", "changes_requested", "details_submitted", "invited", "payment_pending", "payment_review"]);
  });
  it("places every order status in exactly one stage", () => {
    const statuses = orderStages.flatMap((s) => s.statuses).sort();
    expect(statuses).toEqual(["accepted", "cancelled", "completed", "installed", "paid", "processing", "quoted", "requested", "review", "shipped"]);
  });
  it("ignores an unknown stage in the URL", () => {
    expect(stageFor(orderStages, "proposta")?.statuses).toEqual(["requested"]);
    expect(stageFor(orderStages, "nope")).toBeUndefined();
    expect(stageFor(orderStages, undefined)).toBeUndefined();
  });
});

describe("work queues", () => {
  const counts = { applications: 1, enrollmentReview: 2, enrollmentPayment: 3, ordersToQuote: 4, ordersToFulfill: 5, ordersPayment: 6, leasesToAllocate: 7, leasesToInstall: 8, leasesWithIssues: 9, ticketsOpen: 10 };
  it("reports every count once, with payment problems first", () => {
    const queues = workQueues(counts);
    expect(queues.reduce((sum, q) => sum + q.count, 0)).toBe(55);
    expect(new Set(queues.map((q) => q.key)).size).toBe(10);
    expect(queues[0].key).toBe("enrollmentPayment");
  });
  it("links filtered queues to stages those screens accept", () => {
    const byKey = Object.fromEntries(workQueues(counts).map((q) => [q.key, q.href]));
    for (const key of ["enrollmentPayment", "enrollmentReview"] as const) expect(stageFor(enrollmentStages, new URL(byKey[key], "https://x").searchParams.get("etapa")!)).toBeDefined();
    for (const key of ["ordersPayment", "ordersToQuote", "ordersToFulfill"] as const) expect(stageFor(orderStages, new URL(byKey[key], "https://x").searchParams.get("etapa")!)).toBeDefined();
  });
});

describe("search and paging input", () => {
  it("treats LIKE wildcards as literal text", () => {
    expect(literalSearch(" 50%_a\\b ")).toBe("50\\%\\_a\\\\b");
  });
  it("clamps the page number", () => {
    expect(pageNumber(undefined)).toBe(0);
    expect(pageNumber("-3")).toBe(0);
    expect(pageNumber("abc")).toBe(0);
    expect(pageNumber("7")).toBe(7);
    expect(pageNumber("99999999")).toBe(100000);
  });
});

describe("navigation", () => {
  const hrefs = (kind: Parameters<typeof liveNavigation>[0]) => liveNavigation(kind).map((i) => i.href);
  it("starts administrators on the global panel", () => {
    expect(liveHome("admin")).toBe("/painel");
    expect(hrefs("admin").slice(0, 3)).toEqual(["/painel", "/contas", "/investidores"]);
    expect(new Set(hrefs("admin")).size).toBe(hrefs("admin").length);
  });
  it("keeps the global screens away from every other role", () => {
    for (const kind of ["customer", "partner", "support"] as const) {
      for (const href of ["/painel", "/contas", "/investidores", "/admin", "/parcerias"]) expect(hrefs(kind)).not.toContain(href);
    }
    expect(liveHome("partner")).toBe("/home");
    expect(liveHome("customer")).toBe("/pedidos");
  });
});
