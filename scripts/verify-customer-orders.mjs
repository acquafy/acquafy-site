import fs from "node:fs";
import assert from "node:assert/strict";
import { randomUUID, randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
const require = createRequire(process.cwd() + "/system/package.json");
const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");
const origin = process.argv[2];
const stripeSettings = JSON.parse(
  fs.readFileSync("system/.local/stripe-enrollment.json", "utf8"),
);
if (!/^(rk|sk)_test_/.test(stripeSettings.STRIPE_SECRET_KEY))
  throw Error("Test mode only");
const stripe = new Stripe(stripeSettings.STRIPE_SECRET_KEY);
const cfg = JSON.parse(
  fs.readFileSync("system/.local/enrollment-server-env.json", "utf8"),
);
const service = createClient(cfg.SUPABASE_URL, cfg.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const management = fs
  .readFileSync(process.env.PORTAL_TEST_TOKEN_FILE, "utf8")
  .trim();
const adminCredentials = JSON.parse(
  fs.readFileSync("system/.local/hosted-admin-login.json", "utf8"),
);
const email = "orders-" + randomUUID() + "@acquafy.invalid";
let userId, accountId, sessionId, investorAccountId;
async function sql(query) {
  const r = await fetch(
    "https://api.supabase.com/v1/projects/zfxyprckbcwzscyttwyq/database/query",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + management,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  );
  if (!r.ok) throw Error("SQL " + r.status + ": " + (await r.text()));
  return r.json();
}
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
function paymentFixture(token, expectedAmount = 1000) {
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
          expected_amount: expectedAmount,
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
  const password = randomBytes(20).toString("base64url") + "aA1!";
  const generated = await service.auth.admin.generateLink({
    type: "signup",
    email,
    password,
    options: { data: { signup_kind: "customer", portal_role: "internal" } },
  });
  if (generated.error) throw generated.error;
  userId = generated.data.user.id;
  const auth = createClient(cfg.SUPABASE_URL, cfg.SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const verified = await auth.auth.verifyOtp({
    token_hash: generated.data.properties.hashed_token,
    type: "signup",
  });
  if (verified.error) throw verified.error;
  assert.equal(verified.data.user.app_metadata.portal_role, "customer");
  accountId = (
    await sql(
      `select account_id from public.account_memberships where user_id='${userId}'`,
    )
  )[0]?.account_id;
  assert(accountId);
  for (const [c, credentials] of [
    [admin, adminCredentials],
    [partner, { email, password }],
  ]) {
    const r = await c.request("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...credentials, remember: false }),
    });
    assert.equal(r.status, 200, "login");
  }
  const page = await partner.request("/pedido?product=neo-up&mode=purchase");
  assert.equal(page.status, 200);
  assert((await page.text()).includes("Dados do pedido"));
  const requested = await partner.submit(
    "/pedido?product=neo-up",
    "Dados do pedido",
    {
      action: "request",
      kind: "purchase",
      items: JSON.stringify([
        { product: "neo-up", quantity: 1, color: "white", price: 1 },
      ]),
      name: "Test Customer",
      phone: "+15551234567",
      address: "123 Test Street, Orlando FL, US",
    },
  );
  assert.equal(requested.response.status, 303);
  const order = (
    await sql(`select * from public.product_orders where user_id='${userId}'`)
  )[0];
  assert(order);
  assert.equal(order.items[0].catalog_unit_minor, 40000);
  const quote = await admin.submit("/pedidos", "Publicar proposta aprovada", {
    action: "quote",
    order_id: order.id,
    price: "10.00",
    quote_text:
      "TEST ONLY. Approved test quote including delivery and taxes. ".repeat(4),
    approved: "yes",
  });
  assert(quote.html.includes("Alteração registrada."));
  const accepted = await partner.submit("/pedidos", "Aceitar proposta", {
    action: "accept",
    order_id: order.id,
    signer: "Test Customer",
    consent: "yes",
  });
  assert(accepted.html.includes("Alteração registrada."));
  const checkout = await partner.submit("/pedidos", "Pagar pedido", {
    action: "checkout",
    order_id: order.id,
    amount: 1,
  });
  assert.equal(checkout.response.status, 303);
  sessionId = (
    await sql(
      `select checkout_id from public.product_orders where id='${order.id}'`,
    )
  )[0].checkout_id;
  assert(sessionId);
  assert.equal(
    (await stripe.checkout.sessions.retrieve(sessionId)).amount_total,
    1000,
  );
  const fixtureResult = paymentFixture("tok_visa");
  if (fixtureResult) throw Error(fixtureResult.slice(-300));
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  assert.equal(session.payment_status, "paid");
  async function deliver(type, object) {
    const body = JSON.stringify({
      id: "evt_orders_" + randomUUID(),
      object: "event",
      api_version: "2026-09-30.endive",
      created: Math.floor(Date.now() / 1000),
      livemode: false,
      type,
      data: { object },
    });
    const signature = Stripe.webhooks.generateTestHeaderString({
      payload: body,
      secret: stripeSettings.STRIPE_WEBHOOK_SECRET,
    });
    const r = await partner.request("/api/stripe/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": signature,
      },
      body,
    });
    assert.equal(r.status, 200, await r.text());
  }
  await deliver("checkout.session.completed", session);
  await deliver("checkout.session.completed", session);
  assert.equal(
    (
      await sql(
        `select status from public.product_orders where id='${order.id}'`,
      )
    )[0].status,
    "paid",
  );
  const shipped = await admin.submit("/pedidos", "Atualizar entrega", {
    action: "fulfill",
    order_id: order.id,
    status: "shipped",
    tracking_reference: "TEST CARRIER / TEST TRACKING",
  });
  assert(shipped.html.includes("Alteração registrada."));
  const tracked = await partner.request("/pedidos");
  const html = await tracked.text();
  assert(html.includes("TEST TRACKING"));
  assert(html.includes("Enviado"));
  const blocked = await partner.request("/admin");
  assert.equal(blocked.status, 307);
  assert(blocked.headers.get("location").includes("/pedidos"));
  const leaseRequest = await partner.submit(
    "/pedido?product=neo-fit&mode=lease",
    "Dados do pedido",
    {
      action: "request",
      kind: "lease",
      items: JSON.stringify([{ product: "neo-fit", quantity: 1 }]),
      name: "Test Customer",
      phone: "+15551234567",
      address: "123 Test Street, US",
    },
  );
  assert.equal(leaseRequest.response.status, 303);
  const leaseOrder = (
    await sql(
      `select id from public.product_orders where user_id='${userId}' and kind='lease'`,
    )
  )[0];
  const leaseQuote = await admin.submit(
    "/pedidos",
    "Publicar proposta aprovada",
    {
      action: "quote",
      order_id: leaseOrder.id,
      price: "20.00",
      share_bps: "5000",
      quote_text:
        "TEST ONLY. Approved monthly cancellable lease including delivery and installation. ".repeat(
          3,
        ),
      approved: "yes",
    },
  );
  assert(leaseQuote.html.includes("Alteração registrada."));
  assert(
    (
      await sql(
        `select lease_id from public.product_orders where id='${leaseOrder.id}'`,
      )
    )[0].lease_id,
  );
  const linkedLease = (
    await sql(
      `select lease_id from public.product_orders where id='${leaseOrder.id}'`,
    )
  )[0].lease_id;
  investorAccountId = randomUUID();
  const contractId = randomUUID(),
    unitId = randomUUID();
  await sql(
    `begin;insert into public.accounts(id,name)values('${investorAccountId}','Order verification investor');insert into public.contracts(id,account_id,number,title,status,starts_on,ends_on,invested_amount)values('${contractId}','${investorAccountId}','${contractId}','Test','active',current_date,current_date+365,100);insert into public.purifiers(id,account_id,contract_id,serial,model,status,city,state)values('${unitId}','${investorAccountId}','${contractId}','${unitId}','Test','available','Test','Test');select set_config('request.jwt.claim.sub',(select id::text from auth.users where email='${adminCredentials.email}'),true);select public.lease_command('assign',jsonb_build_object('lease_id','${linkedLease}','purifier_id','${unitId}'));commit;`,
  );
  const leaseAccepted = await partner.submit("/locacoes", "Aceitar locação", {
    action: "accept",
    lease_id: linkedLease,
    signer: "Test Customer",
    consent: "yes",
  });
  assert(leaseAccepted.html.includes("Alteração registrada."));
  const leaseCheckout = await partner.submit(
    "/locacoes",
    "Iniciar pagamento recorrente",
    { action: "checkout", lease_id: linkedLease },
  );
  assert.equal(leaseCheckout.response.status, 303);
  sessionId = (
    await sql(
      `select checkout_id from public.customer_leases where id='${linkedLease}'`,
    )
  )[0].checkout_id;
  const leasePayment = paymentFixture("tok_visa", 2000);
  if (leasePayment) throw Error(leasePayment.slice(-300));
  const paidLeaseSession = await stripe.checkout.sessions.retrieve(sessionId);
  assert.equal(paidLeaseSession.payment_status, "paid");
  await deliver("checkout.session.completed", paidLeaseSession);
  assert.equal(
    (
      await sql(
        `select status from public.customer_leases where id='${linkedLease}'`,
      )
    )[0].status,
    "active",
  );
  const subscription =
    typeof paidLeaseSession.subscription === "string"
      ? paidLeaseSession.subscription
      : paidLeaseSession.subscription.id;
  await stripe.subscriptions.cancel(subscription);
  console.log(
    "PASS: verified customer signup and role isolation, private account, purchase request, staff quote, consent, server-priced Stripe test payment, duplicate delivery, shipment tracking, and customer lease acceptance with a real recurring test payment.",
  );
} finally {
  if (sessionId) {
    const lastSession = await stripe.checkout.sessions.retrieve(sessionId);
    if (lastSession.subscription) {
      const subId =
        typeof lastSession.subscription === "string"
          ? lastSession.subscription
          : lastSession.subscription.id;
      const sub = await stripe.subscriptions.retrieve(subId);
      if (sub.status !== "canceled") await stripe.subscriptions.cancel(subId);
    } else if (lastSession.status === "open")
      await stripe.checkout.sessions.expire(sessionId);
  }
  for (const c of [admin, partner])
    await c.request("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
  if (accountId)
    await sql(
      `begin;delete from public.audit_events where account_id in('${accountId}','${investorAccountId ?? accountId}');delete from public.lease_revenue where invoice_id in(select invoice_id from public.lease_receipts where lease_id in(select id from public.customer_leases where account_id='${accountId}'));delete from public.lease_receipts where lease_id in(select id from public.customer_leases where account_id='${accountId}');delete from public.lease_units where lease_id in(select id from public.customer_leases where account_id='${accountId}');delete from public.order_events where order_id in(select id from public.product_orders where account_id='${accountId}');delete from public.product_orders where account_id='${accountId}';delete from public.customer_leases where account_id='${accountId}';delete from public.account_memberships where account_id='${accountId}';delete from public.accounts where id='${accountId}';delete from public.purifiers where account_id='${investorAccountId ?? accountId}';delete from public.contracts where account_id='${investorAccountId ?? accountId}';delete from public.accounts where id='${investorAccountId ?? accountId}';commit;`,
    );
  if (userId) await service.auth.admin.deleteUser(userId);
  console.log(
    "Temporary customer and order fixtures cleaned; Stripe sandbox history retained.",
  );
}
