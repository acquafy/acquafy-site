# Acquafy monorepo

The public Next.js website stays at the repository root and serves `/`. The independent Next.js portal lives in `system/` and serves `/app`. They keep separate layouts, dependencies and Tailwind versions, with one npm workspace lockfile.

## Local development

Requires Node.js 22+, npm, Docker and the Supabase CLI.

```sh
npm ci
npm run supabase:start
npm run supabase:env
npm run dev
```

Open `http://localhost:3000` for the website and `http://localhost:3000/app` for the portal. The runner starts the portal privately on port 3001 and the website forwards `/app`, including assets and auth endpoints. Each process loads its own `.env.local`. `npm run dev:site` and `npm run dev:portal` run either app separately.

The isolated local Supabase project is `acquafy-portal`, with API port 55421 and database port 55422. It does not reuse other projects' local databases. `npm run supabase:env` writes only the local URL and publishable key to ignored `system/.env.local`; it never copies an administrator key. It refuses to overwrite an existing file.

For a built local instance:

```sh
npm run build
npm start
```

`PORT` changes the website port. If changing the portal port, set `PORTAL_ORIGIN` to that origin when building, and use the corresponding `PORTAL_PORT` when starting: Next.js compiles rewrites at build time.

## Authentication and access

The portal uses Supabase email/password authentication through server-side endpoints and HttpOnly, SameSite cookies scoped to `/app` (Secure in production). Every protected request fetches the current user from Supabase, so role changes apply without waiting for JWT refresh. Confirmed, non-anonymous users with server-assigned `app_metadata.portal_role` of `internal`, `partner`, or `customer` can enter their permitted areas. User-editable metadata grants no access.

Portal records and private document downloads require an active account membership, or an administrator grant. Support staff can work the support queue without access to unassigned financial records. `/app/base/*` and `/app/m/duo/*` require `internal`. The old demo cookie, referer and preview-query bypasses have been removed. Login thumbnails are available only to authenticated internal users. Unconfigured or unavailable authentication keeps protected routes locked. Private responses are not cached.

Customer self-registration creates only the `customer` role and a private customer account. Email confirmation is required. The hosted project currently has no custom SMTP configured, so verification delivery remains subject to Supabase default-mail restrictions; production customer signup requires SMTP settings. Staff and investor roles still require administrator provisioning. For example, after creating an authorized partner account:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"portal_role":"internal"}'::jsonb
where email = 'approved-user@example.com';
```

Use `partner` for a partner account. Remove `portal_role` to withdraw access. Access requests and password recovery direct users to their Acquafy administrator; the interface no longer claims to send emails or create accounts. Partner-facing pages read real account-scoped records from Supabase. Profile and bank editing, automated acquisition, amendments and buyback are unavailable in this first slice; users can submit these requests through the real support queue. Old mobile product URLs redirect to the shared responsive portal. Legacy sample-document URLs return 404. Demo security controls and browser-only business mutations are no longer exposed on partner routes.

## Vercel deployment

One Vercel project, **`acquafy-site`** (team **Interfy**), builds and ships both apps as two services of a single deployment, declared in the root `vercel.json`:

| Service  | Root directory  | Build                | Public paths                      |
| -------- | --------------- | -------------------- | --------------------------------- |
| `site`   | repository root | `npm run build:site` | everything except `/app`          |
| `portal` | `system`        | `npm run build`      | `/app` and `/app/*` (`basePath`)  |

The top-level rewrites send `/app` and `/app/(.*)` to `portal` and everything else to `site`. Both services deploy together, so every preview, promotion and rollback is atomic across the website and the portal; there is no `PORTAL_ORIGIN` to repoint. `PORTAL_ORIGIN` now only matters locally: `npm run dev` / `npm start` run the two apps as separate processes and set it so the website proxies `/app` to the portal (see above). The former `acquafy-portal` project is no longer used by this repository.

The portal's server variables (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_ACCOUNT_ID`, `STRIPE_ENVIRONMENT`, `STRIPE_WEBHOOK_SECRET`, `PORTAL_PUBLIC_ORIGIN`) must exist on `acquafy-site` for each environment. `PORTAL_PUBLIC_ORIGIN` is the HTTPS origin of that deployment's site (without `/app`). The Stripe webhook endpoint is `<origin>/app/api/stripe/webhook`.

Vercel deployment protection stays enabled for previews; an externally shared preview may require separate Vercel access.

## Staging (`develop`)

`develop` branches from `main` and uses the **Preview** target of the existing
`acquafy-site` Vercel project. `main` remains the production branch. Do not create
another Vercel or Supabase project, or a Vercel custom environment for staging.
Both website and portal are included in the preview deployment.

Stable staging URL: https://acquafy-site-git-develop-interfy.vercel.app

The existing Supabase Preview credentials were moved from
`feat/portal-app-supabase` to `develop`; the older feature preview no longer has
database credentials. The develop test webhook uses the existing project
protection bypass so Stripe can deliver events while preview protection stays on.
Supabase allows the develop `/app/auth/confirm**` redirect; its production Site URL
remains `https://www.acquafy.com`.

Configure Preview overrides scoped to `develop`: `STRIPE_ENVIRONMENT=test`,
`STRIPE_SECRET_KEY` (a test key), `STRIPE_ACCOUNT_ID`, `STRIPE_WEBHOOK_SECRET`,
`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and
`PORTAL_PUBLIC_ORIGIN` (the stable develop branch preview origin, without `/app`).
Store keys as sensitive variables. Preview code rejects live Stripe mode.
The database is shared with the existing Supabase project: use dedicated test
accounts and records; Stripe test mode does not isolate database writes.

Register a **test mode** Stripe webhook at
`<develop-preview-origin>/app/api/stripe/webhook`, using the event subscriptions
of the existing integration. Ensure Vercel deployment protection permits Stripe
webhook delivery (a protection bypass URL if necessary), and store this endpoint's
signing secret in the develop Preview override. Add the develop origin's auth
callback URL to the existing Supabase redirect allowlist.

Before treating staging as ready, verify customer signup/confirmation, purchase
Checkout with and without a promotion code, investor enrollment, monthly lease
Checkout and invoice events, cancellations/failures, and webhook retries. Confirm
payments are test mode and callbacks return to the develop preview. Existing
Preview feature flags enable purchase and investor registration flows.

## Feature flags

Three Vercel Flags on the `acquafy-site` project switch whole flows on and off without a redeploy. The website reads them in `lib/flags.ts` (the root layout hands them to client components through `components/FeatureFlags.tsx`) and the portal in `system/lib/flags.ts`, so a button and the page or server action behind it always change together.

| Flag                    | Controls                                                                                                                                                                  | Production | Preview / Development |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------- |
| `be-a-partner`          | Be a Partner buttons, links, forms and the `/parceria` page on the website                                                                                                | on         | on                    |
| `buy-now`               | Buy Now buttons, cart, `/buy` and `/checkout` on the website; in the portal `/pedido`, customer sign-up (`/cadastro`) and new orders. Existing orders and leases stay usable | off        | on                    |
| `investor-registration` | Investor registration entry points on the website, `/app/cadastro-investidor` and its server action                                                                       | off        | on                    |

```sh
vercel flags ls
vercel flags enable buy-now --environment production      # or: disable
vercel flags inspect buy-now
```

Hiding a button is never the only guard: pages return 404 and server actions refuse the request while the flag is off. If Vercel Flags cannot be reached (or locally before `vercel env pull`), each flag falls back to its code default: Be a Partner on, the two new flows off. Local development therefore needs the linked project's development credentials (`vercel env pull`, which provides `VERCEL_OIDC_TOKEN`) to see Buy Now and Investor Registration.

### Bypassing the flags in production

To test a gated flow (Buy Now, investor registration) in production without turning it on for everyone, one browser can opt in with a secret link. Set `FLAGS_BYPASS_SECRET` (at least 16 random characters, e.g. `openssl rand -hex 24`) on the `acquafy-site` project for the environment, then open:

```
https://<site>/api/flags-bypass?token=<FLAGS_BYPASS_SECRET>[&next=/buy]
```

That browser receives a signed, HttpOnly cookie (`acquafy-flags-bypass`, 7 days) and sees every flag as on, on the website and in `/app` (pages and server actions), while the flag stays as configured for everyone else. `/api/flags-bypass?clear=1` removes it. Without the variable the endpoint returns 404 and no cookie is accepted; wrong tokens also return 404. Rotating the secret revokes every issued cookie and link. Treat the link like a password: the token is in the URL, so it can appear in access logs and browser history. The portal verifies the same cookie (`system/lib/flags-bypass.ts`), which is shared because the site and `/app` use one origin.

## Auth e-mails

Supabase sends account e-mails through Amazon SES (`email-smtp.us-east-1.amazonaws.com`, sender `no-reply@acquafy.com`, dedicated send-only IAM user). The pt-BR templates, subjects and `site_url` live in `scripts/supabase-auth-emails.mjs`: `node scripts/supabase-auth-emails.mjs preview` renders them to the OS temp directory and `apply` (with `SUPABASE_ACCESS_TOKEN_FILE`) updates the hosted project. SMTP credentials are never stored in the repository.

The hosted Supabase project is **acquafy** (`zfxyprckbcwzscyttwyq`) in **Interfy**, region **US East (Ohio)**. The `feat/portal-app-supabase` branch Preview of `acquafy-site` uses `https://zfxyprckbcwzscyttwyq.supabase.co` and its publishable key through Vercel environment variables. Local development continues to use the isolated local Supabase stack. Never deploy local administrator keys. No production domain promotion is required for branch previews.

Hosted public signup is disabled. The initial confirmed account is `dev@interfy.io`, with `app_metadata.portal_role` set to `internal`. Its generated login credentials are stored only in ignored `system/.local/hosted-admin-login.json`. Provision further approved accounts through the Auth Admin API with the roles described above. The functional portal schema is tracked in `supabase/migrations/`. No sample investments, contracts or payouts are seeded into the hosted database.

## Checks

```sh
npm run typecheck
npm test
npm run lint --workspace=system
npm run build
# With npm start running and the local Supabase stack:
npm run test:auth
```

The website's `npm run lint` also runs its existing ESLint rules; pre-existing website lint findings are outside this integration. The portal design inventory is generated before builds and development, keeping runtime filesystem scans and reference images out of Vercel functions.

## Functional portal operations

- `/app/admin`: administrators create accounts, link/revoke **existing approved Auth users**, suspend accounts, register contracts and allocated equipment, publish reviewed PDFs, and record externally verified payout settlement. This does not initiate bank transfers or send invitation emails.
- `/app/equipe`: administrators and support staff see the ticket queue, reply, assign tickets to themselves, and update status. Account members can read and reply to their account's tickets.
- `/app/home`, `/app/contrato`, `/app/purificadores`, `/app/extrato`, `/app/calendario`, `/app/documentos`: read-only real records, scoped by the selected account. Lists are paginated. Summaries aggregate all records, not just the displayed page.
- `/app/perfil`: authenticated identity and support link. Password/MFA/session management and bank editing are not offered until their real workflows are implemented.
- Documents use the private `portal-documents` bucket (reviewed PDFs up to 10 MB). Downloads pass RLS and expire after 60 seconds. Only administrators publish files. Unpublished files cannot be downloaded by partners.
- Financial records use USD exact decimals. A past due date never marks an obligation paid. Settlement requires a date and reference. Posted settlement is not editable through this slice; corrections, reversals and multi-person finance approval need the later financial workflow.

The initial `dev@interfy.io` user has an explicit `admin` row in `staff_role_grants`. To bootstrap another administrator, a trusted database operator must grant both the approved `internal` Auth metadata and the database staff grant. Merely changing a profile label or Auth metadata does not grant staff administration.

For new partner users, provision the identity through Supabase Auth administration, confirm ownership of the email, assign `app_metadata.portal_role = partner`, then link the email to the intended account in Administration. Account roles `owner` and `viewer` both have read/support access in this read-only slice. Inviting new identities and delegated membership administration are deferred. No business account was automatically created for the initial administrator.

RLS covers every application table. Direct client business writes are revoked. Public invoker RPCs call guarded command implementations in the unexposed `portal_private` schema. Audit events record the authenticated actor, entity, account and non-message state fields. Ordinary account reads and support/staff record commands use the authenticated user client. Investor invitation provisioning and verified Stripe processing additionally use the server-only administrative key described below. Suspending an account or revoking membership removes access on the next database request. Already-issued signed download URLs can remain valid for up to 60 seconds.

### Database setup and verification

Apply the tracked migrations with the Supabase CLI to each database before deploying the app. The CLI's `db push --help` documents linking and connection options. Keep the version filenames aligned with the hosted migration history. The configured local Auth stack can continue to run separately; it also needs these migrations before using the live screens.

Run `supabase/tests/functional_portal.sql` through a trusted SQL connection. The suite creates isolated temporary test identities and records inside a transaction, impersonates partner/support/admin/anonymous roles, tests cross-account reads, writes and storage, checks settlement evidence, support, audit, suspension and revocation, and rolls everything back. It must end with its PASS result. No test password, real bank account or live transfer is used.

Application checks: `npm test`, `npm run typecheck --workspace=system`, `npm run lint --workspace=system`, and `npm run build:portal`.

This is a controlled read-only partner release with manual staff publishing and a support queue. Outgoing payouts, external signature-provider integration, notification delivery, ongoing MFA management and bank-change workflows remain outside this release. Investor invitation onboarding and incoming Stripe payments are implemented below. Supabase's leaked-password-protection advisor warning also remains to be addressed before broader rollout.

For a full HTTP workflow check against a running portal, `scripts/verify-functional-portal.mjs` accepts the origin as its first argument. It uses the ignored initial admin credential file and a privately supplied management-token file via `PORTAL_TEST_TOKEN_FILE`. It creates a randomly named temporary account, publishes a test contract/PDF, exchanges support messages, and verifies database and Storage cleanup in `finally`. Do not interrupt this test while it is cleaning up. `PORTAL_TEST_BYPASS` optionally supplies Vercel automation access for a direct portal preview; no protection credentials are printed.

## Investor onboarding and enrollment

The investor program is separate from the public site's Silver/Gold/Platinum partnership programs. Staff publish the actual approved investor agreement and commercial offer; the application seeds no legal terms or real prices.

1. An administrator opens `/app/parcerias`, publishes a versioned agreement, equipment model, final USD unit price, quantity range and term. Publishing requires explicit approval of those legal/commercial terms. Versions cannot be edited; withdrawal stops new invitations while preserving existing enrollments. Agreement text and pricing are readable only by their invited owner and administrators, not by unrelated partner accounts.
2. Staff prepare a private invitation for an email, account, offer and quantity. A new Supabase identity is provisioned using the Auth Admin API. The generated one-use link verifies the email and lets the participant set a password. The application does not automatically send invitation emails; staff deliver the private link through an approved channel. Existing confirmed users receive a link to the enrollment. Staff can renew an expired invitation without creating another enrollment.
3. The participant submits legal name/entity type, contact and address details. Staff approve or request corrections. This is a documented staff review, not an external KYC certification. Full bank numbers, SSNs and card information are not collected here.
4. After review, the participant reads the full agreement and commercial summary, types their representative name, and explicitly accepts. The original text, reviewed details, exact minor-unit pricing, quantity, version, actor, timestamp and SHA-256 evidence are stored immutably. The text/evidence download remains available in enrollment, Documents and the contract view. This is recorded electronic acceptance, not a third-party digital-signature certificate.
5. Only then can the participant open Stripe-hosted Checkout. All amounts come from the stored offer and enrollment, not the browser. A database lock and a per-attempt Stripe idempotency key reuse pending sessions. Checkout cancellation leaves the agreement intact. Expiration and asynchronous failure permit retry after verified reconciliation.
6. The signed Stripe webhook and authoritative Stripe API state govern activation. An unpaid completed session does not activate. A verified paid session creates one contract; physical equipment is allocated later by staff. Duplicate events cannot create another contract. Refunds/disputes place the enrollment in payment review; late success events cannot undo that review. Payments after access suspension and duplicate payments also require review.
7. Staff and participants can reconcile a payment against Stripe. Staff can authorize another verification after an access block is resolved, but cannot override refunded/disputed state through this flow. Events with no enrollment binding are recorded for administrator investigation instead of granting access.

Onboarding and Stripe privileges are server-side. The portal now additionally needs `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_ENVIRONMENT`, and `PORTAL_PUBLIC_ORIGIN`. Supabase/Stripe secrets must never be client variables. Use a restricted Stripe key with Checkout Sessions read/write, PaymentIntents/Charges read and the permissions needed for inline product pricing. Creating the webhook endpoint additionally requires Webhook Endpoints read/write; sandbox card fixtures additionally need PaymentMethods/test payment permissions. No Stripe publishable key is needed for hosted Checkout.

The `develop` staging preview uses Stripe test mode. Its server settings are isolated to `develop`; production settings are untouched. Live mode requires a matching live key, a separately registered live webhook endpoint, `STRIPE_ENVIRONMENT=live`, and `STRIPE_LIVE_APPROVED=true`. Confirm that the investor offering is approved for processing on the Stripe account before live enablement. The Checkout collects the final published price; automatic tax, separate shipping charges, outgoing investor payouts and Connect onboarding are not part of this enrollment checkout.

Webhook endpoint: `/app/api/stripe/webhook`, subscribed to `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`, `charge.refunded`, `charge.dispute.created` and `charge.dispute.closed`. It must be reachable by Stripe without a user login. For protected Vercel previews, the registered test endpoint uses the project's private automation bypass in its URL; keep that URL confidential. Portal authentication is bypassed only for this endpoint, which independently verifies the raw-body Stripe signature. Database/Stripe processing failures return a retryable error. In production, use the intended production origin and its matching endpoint signing secret.

Verification: `supabase/tests/investor_enrollment.sql` runs privacy, pricing, review, consent, checkout allocation, payment mismatch, duplicate event, activation and refund tests in a transaction and rolls them back. `scripts/verify-investor-enrollment.mjs` verifies the UI flow, OTP/password activation, agreement download, resumed Checkout, declined and successful **test** payments using the official Stripe CLI fixture mechanism. It removes temporary application records and the temporary Auth user in `finally`; sandbox payment history is retained by Stripe. It accepts only test API keys. The local variant delivers a signed test event after checking the actual paid Stripe session; the deployed variant waits for Stripe's real webhook. Do not run it with live settings.

The payment release pins both apps to Next.js 16.4.5 and resolves Sharp 0.35.5. This addresses the critical Next.js production advisories found during implementation. The production-only dependency audit reports no high or critical findings; one moderate baseline-browser-mapping advisory remains. Development-tool advisories are separate from that production audit.

Website investor registration: the Neo Media investment CTA opens `/app/cadastro-investidor`. Public applicants submit contact details and explicit contact consent; this does not create an Auth user or expose an offer. Applications are stored in `investor_applications` and visible only to administrators at `/app/parcerias`. Staff select a registration, verify the contact, choose approved terms and quantity, and prepare the existing private invitation. The application is atomically linked to its enrollment, and repeat invitations are rejected; invitation renewal remains available. No automatic email is sent. Submissions are deduplicated by email for 24 hours and globally capped at 100 per hour in the database, with a form honeypot. Returning investors use `/app/login?next=adesao` to continue their enrollment. Silver/Gold/Platinum registrations remain separate.

Lease operations are implemented at `/app/locacoes` for provisioned customer accounts. Staff publish approved monthly USD terms and investor share (basis points), assign available investor units before customer consent, then confirm installation after verified payment. Customers accept the recorded agreement, open recurring Checkout, manage billing in Stripe, and schedule cancellation at period end. `lease_receipts` records verified invoice collections; `lease_revenue` allocates the investor share equally across assigned units, distributing rounding cents deterministically. Accruals are separate from outgoing payouts. This version supports monthly cancellable rental only, without financing, deposits, fixed-term ownership transfer or automatic tax. Customer identity provisioning uses the existing staff account workflow.

Customer product orders: `/app/pedido` accepts the selected products and purchase/lease choice; `/app/cadastro` creates a customer account with email verification. `/app/pedidos` provides requests, staff-approved final quotes (USD, including delivery and taxes), consent, Stripe purchase payment and staff delivery/tracking updates. Lease quotes create linked lease agreements managed from the customer account. Catalog amounts are estimates; no reservation fee is collected. The old client-amount PaymentIntent endpoint returns 410. Customer accounts use a restricted navigation and cannot enter investor or staff routes. Signup uses Supabase confirmation email; configure production SMTP before opening public registration broadly. Outgoing investor payouts remain staff-controlled.

ParceladoUSA installments: when `PARCELADOUSA_PUBLIC_KEY` and `PARCELADOUSA_MERCHANT_CODE` (store code) are set, the customer can pay the balance of a BRL order in installments with a Brazilian card on ParceladoUSA's hosted page instead of Stripe. `PARCELADOUSA_ENVIRONMENT` is `sandbox` (default, the only value allowed on previews) or `production`. Each ParceladoUSA order is created with its own callback, `<origin>/app/api/orders/parceladousa/<payment id>`; the callback is unsigned, so the portal reads the status from ParceladoUSA's API (`GET /order/{id}`) and only accepts orders it created for that payment. Approved = paid, aborted = failed, canceled = refunded. ParceladoUSA payments are refunded by staff in the ParceladoUSA panel (its cancellation callback then records the refund); a payment made on a replaced Stripe session or ParceladoUSA order puts the order in review for a manual refund. The integration follows ParceladoUSA's official WooCommerce plugin, since there is no public API reference: confirm the request and response formats with ParceladoUSA in the sandbox before production.

Stripe coupons: the three hosted Checkouts (purchase orders, monthly leases and investor enrollment) accept Stripe promotion codes (`allow_promotion_codes`). Create the coupon and a customer-facing promotion code in the Stripe Dashboard (same mode as `STRIPE_ENVIRONMENT`); restrict them there (products, first-time customers, minimum amount, expiry, redemptions) as needed, since every code active on the account is accepted. Webhooks verify the pre-discount subtotal against the stored price and reject tax or shipping lines; the amount actually charged, the discount and the promotion code (or coupon) id are recorded in `product_orders`, `enrollment_checkouts` and `lease_receipts`. A 100% coupon (`no_payment_required`) counts as paid. Lease coupons apply to the invoices Stripe discounts (once, repeating or forever), and the investor share is allocated on the amount actually collected. An investor contract's `invested_amount` is the amount actually paid.
