// End-to-end test. Requires privately supplied management-token file and ignored server settings.
// Only Stripe test keys are accepted. All application fixtures and the temporary Auth user are removed.
import fs from "node:fs";
import assert from "node:assert/strict";
import { randomUUID, randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
const require = createRequire(process.cwd() + "/system/package.json");
const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");
const origin = process.argv[2] || "http://localhost:3018";
const stripeSettings = JSON.parse(
  fs.readFileSync("system/.local/stripe-enrollment.json", "utf8"),
);
const server = JSON.parse(
  fs.readFileSync("system/.local/enrollment-server-env.json", "utf8"),
);
if (!/^(rk|sk)_test_/.test(stripeSettings.STRIPE_SECRET_KEY))
  throw new Error("Only Stripe test keys are allowed");
const stripe = new Stripe(stripeSettings.STRIPE_SECRET_KEY);
const service = createClient(
  server.SUPABASE_URL,
  server.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
const management = fs
  .readFileSync(process.env.PORTAL_TEST_TOKEN_FILE, "utf8")
  .trim();
const marker = "[Enrollment verification] " + randomUUID();
const email = "enrollment-" + randomUUID() + "@acquafy.invalid";
const literal = "'" + marker + "'";
const adminCredentials = JSON.parse(
  fs.readFileSync("system/.local/hosted-admin-login.json", "utf8"),
);
const localEvent = "evt_local_" + randomUUID();
let createdUser;
let sessionId;
async function sql(query) {
  const r = await fetch(
    "https://api.supabase.com/v1/projects/zfxyprckbcwzscyttwyq/database/query",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + management,
        "content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  );
  if (!r.ok) throw new Error("Management SQL failed " + r.status);
  return r.json();
}
const scope = `select id from public.accounts where name=${literal}`;
const enrollmentScope = `select id from public.investor_enrollments where account_id in(${scope})`;
const cleanup = `begin;
 delete from public.investor_applications where email='${email}';
 delete from public.audit_events where account_id in(${scope}) or entity_id in(select id::text from public.investor_enrollments where account_id in(${scope})) or entity_id in(select id::text from public.enrollment_checkouts where enrollment_id in(${enrollmentScope})) or entity_id in(select id::text from public.agreement_acceptances where enrollment_id in(${enrollmentScope})) or entity_id in(select id::text from public.investor_offers where title=${literal});
 delete from public.agreement_acceptances where enrollment_id in(${enrollmentScope});
 delete from public.enrollment_checkouts where enrollment_id in(${enrollmentScope});
 delete from public.investor_enrollments where account_id in(${scope});
 delete from public.contracts where account_id in(${scope});
 delete from public.account_memberships where account_id in(${scope});
 delete from public.accounts where name=${literal};
 delete from public.investor_offers where title=${literal};
 delete from public.stripe_events where event_id='${localEvent}';
 commit;`;
// Verify cleanup permissions before creating any fixture.
await sql(cleanup);
function decode(v) {
  return v
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}
function client() {
  const jar = new Map();
  for (const pair of (process.env.PORTAL_TEST_INITIAL_COOKIE ?? "").split(
    "; ",
  )) {
    const i = pair.indexOf("=");
    if (i > 0) jar.set(pair.slice(0, i), pair.slice(i + 1));
  }
  const headers = () => ({
    cookie: [...jar].map(([k, v]) => k + "=" + v).join("; "),
    ...(process.env.PORTAL_TEST_BYPASS
      ? { "x-vercel-protection-bypass": process.env.PORTAL_TEST_BYPASS }
      : {}),
  });
  async function request(path, options = {}) {
    const r = await fetch(origin + "/app" + path, {
      ...options,
      headers: { ...headers(), ...options.headers },
      redirect: "manual",
    });
    for (const c of r.headers.getSetCookie()) {
      const p = c.split(";")[0],
        i = p.indexOf("=");
      jar.set(p.slice(0, i), p.slice(i + 1));
    }
    return r;
  }
  async function submit(path, title, fields) {
    const html = await (await request(path)).text();
    const form = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)]
      .map((m) => m[0])
      .find((s) => s.includes(title));
    assert(form, "form " + title);
    const body = new FormData();
    for (const match of form.matchAll(/<input\b[^>]*>/g)) {
      const tag = match[0];
      if (!tag.includes('type="hidden"')) continue;
      const key = /name="([^"]+)"/.exec(tag)?.[1],
        value = /value="([^"]*)"/.exec(tag)?.[1] ?? "";
      if (key) body.append(decode(key), decode(value));
    }
    for (const [k, v] of Object.entries(fields)) body.set(k, v);
    const response = await request(path, {
      method: "POST",
      headers: { origin },
      body,
    });
    return { response, html: await response.text() };
  }
  return { request, submit };
}
const admin = client(),
  partner = client();
async function signedEvent(session, eventId) {
  const payload = JSON.stringify({
    id: eventId,
    object: "event",
    api_version: "2026-09-30.endive",
    created: Math.floor(Date.now() / 1000),
    livemode: false,
    type: "checkout.session.completed",
    data: { object: session },
  });
  const signature = Stripe.webhooks.generateTestHeaderString({
    payload,
    secret: stripeSettings.STRIPE_WEBHOOK_SECRET,
  });
  const r = await admin.request("/api/stripe/webhook", {
    method: "POST",
    headers: {
      "stripe-signature": signature,
      "content-type": "application/json",
    },
    body: payload,
  });
  assert.equal(r.status, 200, "signed payment event");
}
function paymentFixture(token) {
  const file =
    "/private/tmp/acquafy-enrollment-fixture-" + randomUUID() + ".json";
  const fixture = {
    _meta: { template_version: 0 },
    fixtures: [
      {
        name: "payment_page",
        path: "/v1/payment_pages/" + sessionId,
        method: "get",
      },
      {
        name: "payment_method",
        path: "/v1/payment_methods",
        method: "post",
        params: {
          type: "card",
          card: { token },
          billing_details: { email, name: "Enrollment verification" },
        },
      },
      {
        name: "payment_page_confirm",
        path: "/v1/payment_pages/" + sessionId + "/confirm",
        method: "post",
        params: {
          payment_method: "${payment_method:id}",
          expected_amount: 1000,
        },
      },
    ],
  };
  fs.writeFileSync(file, JSON.stringify(fixture));
  try {
    execFileSync("stripe", ["fixtures", file], {
      env: { ...process.env, STRIPE_API_KEY: stripeSettings.STRIPE_SECRET_KEY },
      stdio: ["ignore", "pipe", "pipe"],
    });
    return null;
  } catch (e) {
    return String(e.stderr ?? e.stdout ?? "").replace(
      /(?:rk|sk)_(?:test|live)_[A-Za-z0-9]+/g,
      "[redacted key]",
    );
  } finally {
    fs.unlinkSync(file);
  }
}
try {
  const application = await partner.submit(
    "/cadastro-investidor",
    "Cadastro de interesse",
    {
      full_name: marker,
      email,
      phone: "+15551234567",
      country: "United States",
      company: marker,
      message: "TEST REGISTRATION",
      consent: "yes",
      website: "",
    },
  );
  assert.equal(application.response.status, 200, "public registration");
  assert(
    application.html.includes("Solicitação recebida."),
    "registration acknowledged",
  );
  const applicants = await sql(
    `select id from public.investor_applications where email='${email}'`,
  );
  assert.equal(applicants.length, 1, "application stored");
  const applicationId = applicants[0].id;
  const login = await admin.request("/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email: adminCredentials.email,
      password: adminCredentials.password,
      remember: false,
    }),
  });
  assert.equal(login.status, 200, "admin login");
  const published = await admin.submit(
    "/parcerias",
    "Publicar oferta aprovada",
    {
      action: "publish",
      title: marker,
      version: "verification-1",
      agreement_text: (
        "TEST ONLY — DO NOT USE AS A LEGAL AGREEMENT. " +
        marker +
        "\n"
      ).repeat(5),
      unit_model: "Verification model",
      unit_price: "5.00",
      term_months: "12",
      min_quantity: "1",
      max_quantity: "10",
      approved: "yes",
    },
  );
  assert.equal(published.response.status, 200);
  assert(published.html.includes("Alteração registrada."), "publish action");
  const offers = await sql(
    `select id from public.investor_offers where title=${literal}`,
  );
  assert(offers[0]?.id, "published offer");
  const invited = await admin.submit(
    "/parcerias?application=" + applicationId,
    "Convidar investidor",
    {
      application_id: applicationId,
      email,
      offer_id: offers[0].id,
      quantity: "2",
      account_name: marker,
      account_id: "",
    },
  );
  assert.equal(invited.response.status, 200);
  const link = [
    ...invited.html.matchAll(/<textarea\b[^>]*>([\s\S]*?)<\/textarea>/g),
  ]
    .map((m) => decode(m[1]))
    .find((v) => v.startsWith("https://") && v.includes("/app/ativar?"));
  assert(link, "private invitation link");
  const activation = new URL(link);
  const id = activation.searchParams.get("enrollment");
  assert(id, "enrollment reference");
  const linked = await sql(
    `select enrollment_id from public.investor_applications where id='${applicationId}'`,
  );
  assert.equal(
    linked[0]?.enrollment_id,
    id,
    "registration linked to invited enrollment",
  );
  const enrolled = await sql(
    `select user_id,amount_minor,status from public.investor_enrollments where id='${id}'`,
  );
  createdUser = enrolled[0]?.user_id;
  assert.equal(enrolled[0]?.amount_minor, 1000, "server price");
  const password = randomBytes(24).toString("base64url") + "aA1!";
  const activated = await partner.submit(
    "/ativar" + activation.search,
    "Criar senha",
    {
      token_hash: activation.searchParams.get("token_hash"),
      type: activation.searchParams.get("type"),
      enrollment: id,
      password,
      confirmation: password,
    },
  );
  assert.equal(activated.response.status, 303, "invite activation");
  const details = await partner.submit(
    "/adesao?enrollment=" + id,
    "Dados do participante",
    {
      action: "details",
      enrollment_id: id,
      legal_name: "Verification Participant",
      entity_type: "individual",
      phone: "+14075550123",
      country: "US",
      address: "123 Verification Way",
      city: "Orlando",
      region: "FL",
      postal_code: "32819",
      amount_minor: "1",
    },
  );
  assert.equal(details.response.status, 200);
  assert(
    details.html.includes("Dados enviados para análise."),
    "submitted details",
  );
  const approved = await admin.submit("/parcerias", "Aprovar dados", {
    action: "approve",
    enrollment_id: id,
  });
  assert(approved.html.includes("Alteração registrada."), "staff review");
  const accepted = await partner.submit(
    "/adesao?enrollment=" + id,
    "Aceite do acordo",
    {
      action: "accept",
      enrollment_id: id,
      signer_name: "Verification Participant",
      consent: "yes",
    },
  );
  assert(accepted.html.includes("Aceite registrado."), "agreement acceptance");
  const agreement = await partner.request("/api/agreements/" + id);
  assert.equal(agreement.status, 200);
  assert((await agreement.text()).includes("SHA-256"), "acceptance evidence");
  const checkout = await partner.submit(
    "/adesao?enrollment=" + id,
    "Pagamento da adesão",
    { enrollment_id: id, amount_minor: "1" },
  );
  assert.equal(checkout.response.status, 303, "checkout redirect");
  assert.equal(
    new URL(checkout.response.headers.get("location")).hostname,
    "checkout.stripe.com",
  );
  const attempts = await sql(
    `select stripe_session_id from public.enrollment_checkouts where enrollment_id='${id}'`,
  );
  sessionId = attempts[0]?.stripe_session_id;
  assert(sessionId, "persisted Stripe session");
  let session = await stripe.checkout.sessions.retrieve(sessionId);
  assert.equal(session.amount_total, 1000);
  assert.equal(session.currency, "usd");
  assert.equal(session.livemode, false);
  const resumed = await partner.submit(
    "/adesao?enrollment=" + id,
    "Pagamento da adesão",
    { enrollment_id: id },
  );
  assert.equal(
    resumed.response.headers.get("location"),
    checkout.response.headers.get("location"),
    "resumed same Checkout",
  );
  const declined = paymentFixture("tok_chargeDeclined");
  assert(
    declined &&
      /card_declined|Your card was declined|card has been declined/i.test(
        declined,
      ),
    "Stripe declined the test card",
  );
  const unpaid = await sql(
    `select status from public.investor_enrollments where id='${id}'`,
  );
  assert.equal(
    unpaid[0]?.status,
    "payment_pending",
    "declined card did not activate",
  );
  const paid = paymentFixture("tok_visa");
  if (paid)
    throw new Error("Stripe test payment fixture failed: " + paid.slice(-600));
  session = await stripe.checkout.sessions.retrieve(sessionId);
  assert.equal(session.payment_status, "paid", "Stripe confirmed payment");
  if (process.env.PORTAL_TEST_LOCAL_WEBHOOK === "1")
    await signedEvent(session, localEvent);
  let state;
  for (let i = 0; i < 30; i++) {
    state = (
      await sql(
        `select status,contract_id from public.investor_enrollments where id='${id}'`,
      )
    )[0];
    if (state.status === "active") break;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  assert.equal(state.status, "active", "verified webhook activation");
  assert(state.contract_id, "contract created");
  const count = await sql(
    `select count(*)::int as count from public.contracts where id='${state.contract_id}'`,
  );
  assert.equal(count[0]?.count, 1);
  const events = await sql(
    `select event_id from public.stripe_events where object_id='${sessionId}' order by processed_at`,
  );
  assert(events[0]?.event_id, "payment receipt");
  await signedEvent(session, events[0].event_id);
  const active = await partner.request("/adesao?enrollment=" + id);
  assert(
    (await active.text()).includes("Parceria ativa"),
    "active partner screen",
  );
  console.log(
    "PASS: public website registration, linked staff invitation, offer publishing, private invitation, OTP/password activation, details, staff review, agreement evidence, server-priced and resumable Stripe Checkout, declined test card, successful test payment, webhook activation and duplicate delivery",
  );
} finally {
  // Find even partially created identities if a UI assertion failed before its id was captured.
  if (!createdUser) {
    const users = await service.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    createdUser = users.data?.users.find((u) => u.email === email)?.id;
  }
  if (sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.status === "open")
      await stripe.checkout.sessions.expire(sessionId);
  }
  for (const c of [partner, admin])
    await c.request("/api/auth/logout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
    });
  await sql(cleanup);
  if (createdUser) {
    const removed = await service.auth.admin.deleteUser(createdUser);
    if (removed.error) throw new Error("Temporary identity cleanup failed");
  }
  const remaining = await sql(
    `select count(*)::int as count from public.accounts where name=${literal}`,
  );
  assert.equal(remaining[0]?.count, 0, "application fixture cleanup");
  console.log(
    "Verified temporary enrollment, agreement, contract and Auth identity cleanup. Stripe test payment history is retained in the sandbox.",
  );
}
