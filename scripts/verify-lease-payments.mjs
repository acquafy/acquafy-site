import fs from "node:fs";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
const require = createRequire(process.cwd() + "/system/package.json");
const Stripe = require("stripe");
const config = JSON.parse(
  fs.readFileSync("system/.local/stripe-enrollment.json", "utf8"),
);
if (!/^(rk|sk)_test_/.test(config.STRIPE_SECRET_KEY))
  throw Error("Test mode only");
const stripe = new Stripe(config.STRIPE_SECRET_KEY);
const auth = fs.readFileSync(process.env.PORTAL_TEST_TOKEN_FILE, "utf8").trim();
const preview = JSON.parse(
  fs.readFileSync("system/.local/registration-preview-test.json", "utf8"),
);
async function sql(query) {
  const r = await fetch(
    "https://api.supabase.com/v1/projects/zfxyprckbcwzscyttwyq/database/query",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  );
  if (!r.ok) throw Error("SQL " + r.status + ": " + (await r.text()));
  return r.json();
}
const account = randomUUID(),
  contract = randomUUID(),
  unit = randomUUID(),
  lease = randomUUID();
let customer, subscription;
try {
  await sql(
    `begin;insert into public.accounts(id,name)values('${account}','Lease verification ${account}');insert into public.contracts(id,account_id,number,title,status,starts_on,ends_on,invested_amount)values('${contract}','${account}','${contract}','Test','active',current_date,current_date+365,100);insert into public.purifiers(id,account_id,contract_id,serial,model,status,city,state)values('${unit}','${account}','${contract}','${unit}','Test','available','Test','Test');insert into public.customer_leases(id,account_id,title,agreement_text,monthly_minor,share_bps,location,status,accepted_at,signer)values('${lease}','${account}','Test lease',repeat('TEST ONLY ',20),1000,5000,'Test location','accepted',now(),'Test signer');insert into public.lease_units values('${lease}','${unit}');commit;`,
  );
  customer = await stripe.customers.create({
    name: "Lease verification",
    payment_method: "pm_card_visa",
    invoice_settings: { default_payment_method: "pm_card_visa" },
  });
  subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 1000,
          recurring: { interval: "month" },
          product: (
            await stripe.products.create({ name: "Lease verification" })
          ).id,
        },
      },
    ],
    metadata: { integration: "acquafy_lease", lease_id: lease },
  });
  await sql(
    `update public.customer_leases set subscription_id='${subscription.id}',customer_id='${customer.id}' where id='${lease}';`,
  );
  const invoice = await stripe.invoices.retrieve(
    typeof subscription.latest_invoice === "string"
      ? subscription.latest_invoice
      : subscription.latest_invoice.id,
  );
  assert.equal(invoice.status, "paid");
  console.log({
    subscriptionTagged: subscription.metadata.integration,
    invoiceHasSubscription:
      !!invoice.parent?.subscription_details?.subscription,
  });
  async function deliver(type, object) {
    const payload = JSON.stringify({
      id: "evt_test_" + randomUUID(),
      object: "event",
      api_version: "2026-09-30.endive",
      created: Math.floor(Date.now() / 1000),
      livemode: false,
      type,
      data: { object },
    });
    const signature = Stripe.webhooks.generateTestHeaderString({
      payload,
      secret: config.STRIPE_WEBHOOK_SECRET,
    });
    const r = await fetch(process.argv[2] + "/app/api/stripe/webhook", {
      method: "POST",
      headers: {
        "x-vercel-protection-bypass": preview.portalBypass,
        "stripe-signature": signature,
        "Content-Type": "application/json",
      },
      body: payload,
    });
    const responseText = await r.text();
    assert.equal(r.status, 200, responseText);
    assert(
      responseText.includes('"received":true'),
      "Webhook did not execute: " + r.url + " " + responseText.slice(0, 100),
    );
  }
  await deliver("invoice.paid", invoice);
  await deliver("invoice.paid", invoice);
  const rows = await sql(
    `select r.amount_minor,r.state,l.status from public.lease_revenue r join public.lease_receipts p using(invoice_id) join public.customer_leases l on l.id=p.lease_id where l.id='${lease}'`,
  );
  assert.equal(rows.length, 1);
  assert.equal(rows[0].amount_minor, 500);
  assert.equal(rows[0].state, "pending_install");
  assert.equal(rows[0].status, "active");
  const payments = await stripe.invoicePayments.list({ invoice: invoice.id });
  const pi = payments.data[0].payment.payment_intent;
  const intent = await stripe.paymentIntents.retrieve(
    typeof pi === "string" ? pi : pi.id,
  );
  await stripe.refunds.create({ payment_intent: intent.id });
  const charge = await stripe.charges.retrieve(
    typeof intent.latest_charge === "string"
      ? intent.latest_charge
      : intent.latest_charge.id,
  );
  await deliver("charge.refunded", charge);
  await deliver("invoice.paid", invoice);
  const risk = await sql(
    `select state from public.lease_revenue where invoice_id='${invoice.id}'`,
  );
  assert.equal(risk[0].state, "review");
  console.log(
    "PASS: real Stripe test subscription, verified paid invoice, duplicate collection, investor share, installation hold, refund review and stale paid delivery.",
  );
} catch (e) {
  console.error("Lease verification:", e.message);
  throw e;
} finally {
  if (subscription) await stripe.subscriptions.cancel(subscription.id);
  if (customer) await stripe.customers.del(customer.id);
  await sql(
    `begin;delete from public.audit_events where account_id='${account}';delete from public.lease_revenue where invoice_id in(select invoice_id from public.lease_receipts where lease_id='${lease}');delete from public.lease_receipts where lease_id='${lease}';delete from public.lease_units where lease_id='${lease}';delete from public.customer_leases where id='${lease}';delete from public.purifiers where id='${unit}';delete from public.contracts where id='${contract}';delete from public.accounts where id='${account}';commit;`,
  );
  console.log("Temporary lease records cleaned.");
}
