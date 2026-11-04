import fs from "node:fs";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const { createClient } = createRequire(process.cwd() + "/system/package.json")(
  "@supabase/supabase-js",
);
const origin = process.argv[2] || "http://localhost:3018";
const token = fs
  .readFileSync(process.env.PORTAL_TEST_TOKEN_FILE, "utf8")
  .trim();
const name = "[Verification] " + crypto.randomUUID();
const literal = "'" + name.replaceAll("'", "''") + "'";
async function sql(query) {
  const r = await fetch(
    "https://api.supabase.com/v1/projects/zfxyprckbcwzscyttwyq/database/query",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  );
  if (!r.ok) throw new Error("Test SQL access returned " + r.status);
  return r.json();
}
const cleanup = `begin;
 delete from public.support_messages where ticket_id in (select id from public.support_tickets where account_id in (select id from public.accounts where name=${literal}));
 delete from public.support_tickets where account_id in (select id from public.accounts where name=${literal});
 delete from public.audit_events where account_id in (select id from public.accounts where name=${literal});
 delete from public.documents where account_id in (select id from public.accounts where name=${literal});
 delete from public.contracts where account_id in (select id from public.accounts where name=${literal});
 delete from public.account_memberships where account_id in (select id from public.accounts where name=${literal});
 delete from public.accounts where name=${literal}; commit;`;
// Verify SQL permissions before any test write. The selector is a fresh random test name.
await sql(cleanup);
const credentials = JSON.parse(
  fs.readFileSync("system/.local/hosted-admin-login.json", "utf8"),
);
const jar = new Map();
function take(r) {
  for (const c of r.headers.getSetCookie()) {
    const p = c.split(";")[0];
    const i = p.indexOf("=");
    jar.set(p.slice(0, i), p.slice(i + 1));
  }
}
function headers() {
  return {
    cookie: [...jar].map(([k, v]) => k + "=" + v).join("; "),
    ...(process.env.PORTAL_TEST_BYPASS
      ? { "x-vercel-protection-bypass": process.env.PORTAL_TEST_BYPASS }
      : {}),
  };
}
async function get(path) {
  const r = await fetch(origin + "/app" + path, {
    headers: headers(),
    redirect: "manual",
  });
  take(r);
  return r;
}
function decode(v) {
  return v
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}
async function submit(path, title, fields, saved = true) {
  const current = await (await get(path)).text();
  const form = [...current.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)]
    .map((m) => m[0])
    .find((s) => s.includes(title));
  assert(form, "form " + title);
  const body = new FormData();
  for (const m of form.matchAll(/<input\b[^>]*>/g)) {
    const tag = m[0];
    if (!tag.includes('type="hidden"')) continue;
    const key = /name="([^"]+)"/.exec(tag)?.[1];
    const value = /value="([^"]*)"/.exec(tag)?.[1] ?? "";
    if (key) body.append(decode(key), decode(value));
  }
  for (const [k, v] of Object.entries(fields)) body.set(k, v);
  const r = await fetch(origin + "/app" + path, {
    method: "POST",
    headers: { ...headers(), origin },
    body,
    redirect: "manual",
  });
  take(r);
  assert(
    [303, 307].includes(r.status),
    "action " + title + " status " + r.status,
  );
  assert(
    saved
      ? r.headers.get("location")?.includes("saved=1")
      : r.headers.get("location")?.endsWith("/app/home"),
    "action " + title + " result " + r.headers.get("location"),
  );
}
let result;
try {
  const login = await fetch(origin + "/app/api/auth/login", {
    method: "POST",
    headers: { ...headers(), "content-type": "application/json" },
    body: JSON.stringify({ ...credentials, remember: false }),
    redirect: "manual",
  });
  take(login);
  assert.equal(login.status, 200, "login");
  const initial = await (await get("/admin")).text();
  assert(initial.includes("Administração"), "admin access");
  assert(!initial.includes("Carlos Silva"), "sample identity retired");
  await submit("/admin", "Criar conta", { name });
  const created = await sql(
    `select id from public.accounts where name=${literal}`,
  );
  const account = created[0]?.id;
  assert(account, "created account");
  // Explicitly select this fixture; do not depend on alphabetical account ordering.
  const formPage = await (await get("/admin")).text();
  const accountForm = [...formPage.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)]
    .map((m) => m[0])
    .find((s) => s.includes('name="account_id"') && s.includes("Abrir conta"));
  assert(accountForm, "account switch form");
  await submit("/admin", "Abrir conta", { account_id: account }, false);
  await submit("/admin", "Cadastrar contrato", {
    account_id: account,
    number: "VERIFY-" + account,
    title: "Verification contract",
    status: "active",
    starts_on: "2026-01-01",
    ends_on: "2027-01-01",
    invested_amount: "800",
  });
  assert(
    (await (await get("/contrato")).text()).includes("Verification contract"),
    "published contract",
  );
  await submit("/suporte", "Abrir chamado", {
    account_id: account,
    subject: name,
    body: "Testing a persisted support message.",
  });
  const queue = await (await get("/equipe")).text();
  assert(queue.includes(name), "ticket reached staff queue");
  const tickets = await sql(
    `select id from public.support_tickets where account_id='${account}'`,
  );
  const ticket = tickets[0]?.id;
  assert(ticket, "persisted ticket");
  await submit("/equipe?ticket=" + ticket, "Responder", {
    ticket_id: ticket,
    queue: "1",
    body: "Verified response from the staff queue.",
  });
  assert(
    (await (await get("/suporte?ticket=" + ticket)).text()).includes(
      "Verified response from the staff queue.",
    ),
    "staff response returned to account",
  );
  assert.equal(
    (await get("/docs/contrato-participacao-acquafy.pdf")).status,
    404,
  );
  assert(
    (await get("/m/ios/financeiro")).headers
      .get("location")
      ?.endsWith("/app/extrato"),
  );
  const pdf = new File(
    ["%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF"],
    "verification.pdf",
    { type: "application/pdf" },
  );
  await submit("/admin", "Publicar documento privado", {
    account_id: account,
    title: "Verification PDF",
    contract_id: "",
    file: pdf,
  });
  const docs = await sql(
    `select id from public.documents where account_id='${account}'`,
  );
  assert(docs[0]?.id, "published document");
  const download = await get("/api/documents/" + docs[0].id);
  assert.equal(download.status, 303, "private download authorization");
  const file = await fetch(download.headers.get("location"));
  assert.equal(file.status, 200, "signed download");
  assert((await file.text()).startsWith("%PDF-"), "stored content");
  const profile = await (await get("/perfil")).text();
  assert(
    !profile.includes("Ativar autenticação em duas etapas"),
    "mock MFA removed",
  );
  result =
    "PASS: HTTP login, administrator account/contract forms, persisted support submission, staff reply, private PDF upload/download, mobile routing and retired samples";
} finally {
  const objects = await sql(
    `select object_path from public.documents where account_id in(select id from public.accounts where name=${literal})`,
  );
  await sql(cleanup);
  if (objects.length) {
    const db = createClient(
      "https://zfxyprckbcwzscyttwyq.supabase.co",
      "sb_publishable_s2JhKuL-mqX19CVQdRPfcQ_prjbMhZx",
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const signed = await db.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    assert(!signed.error, "cleanup authentication");
    try {
      const removed = await db.storage
        .from("portal-documents")
        .remove(objects.map((o) => o.object_path));
      assert(!removed.error, "storage cleanup");
      assert.equal(
        removed.data.length,
        objects.length,
        "storage objects removed",
      );
    } finally {
      await db.auth.signOut({ scope: "local" });
    }
  }
  const remaining = await sql(
    `select count(*)::int as count from public.accounts where name=${literal}`,
  );
  assert.equal(remaining[0]?.count, 0, "fixture cleanup");
  const logout = await fetch(origin + "/app/api/auth/logout", {
    method: "POST",
    headers: { ...headers(), "content-type": "application/json" },
    body: "{}",
    redirect: "manual",
  });
  take(logout);
  console.log("Verified temporary fixture cleanup");
}
assert.equal((await get("/admin")).status, 307, "logout");
console.log(result);
