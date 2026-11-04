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

The portal uses Supabase email/password authentication through server-side endpoints and HttpOnly, SameSite cookies scoped to `/app` (Secure in production). Every protected request fetches the current user from Supabase, so role changes apply without waiting for JWT refresh. Only confirmed, non-anonymous users with administrator-assigned `app_metadata.portal_role` of `internal` or `partner` can enter. User-editable metadata grants no access.

Portal records and private document downloads require an active account membership, or an administrator grant. Support staff can work the support queue without access to unassigned financial records. `/app/base/*` and `/app/m/duo/*` require `internal`. The old demo cookie, referer and preview-query bypasses have been removed. Login thumbnails are available only to authenticated internal users. Unconfigured or unavailable authentication keeps protected routes locked. Private responses are not cached.

Self-registration is disabled globally. Provision confirmed accounts through Supabase administration and assign `portal_role` using its Admin API or database administration. For example, after creating the account:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"portal_role":"internal"}'::jsonb
where email = 'approved-user@example.com';
```

Use `partner` for a partner account. Remove `portal_role` to withdraw access. Access requests and password recovery direct users to their Acquafy administrator; the interface no longer claims to send emails or create accounts. Partner-facing pages read real account-scoped records from Supabase. Profile and bank editing, automated acquisition, amendments and buyback are unavailable in this first slice; users can submit these requests through the real support queue. Old mobile product URLs redirect to the shared responsive portal. Legacy sample-document URLs return 404. Demo security controls and browser-only business mutations are no longer exposed on partner routes.

## Vercel branch previews

Both projects belong to team **Interfy** and use this Git repository:

| Project          | Root directory  | Build                | Purpose                       |
| ---------------- | --------------- | -------------------- | ----------------------------- |
| `acquafy-site`   | repository root | `npm run build:site` | Website and `/app` forwarding |
| `acquafy-portal` | `system`        | `npm run build`      | Portal with `basePath: /app`  |

Deploy the portal preview first, then set the website's **branch-scoped Preview** `PORTAL_ORIGIN` to that portal deployment's HTTPS origin. Build the website preview afterward. This binds the website preview to the exact portal build under test. The origin excludes `/app`; the rewrites add it. Repoint this variable when deploying a new portal revision.

Vercel deployment protection stays enabled. Interfy members authenticated on the website preview can follow Vercel's protected rewrites to the portal in the same team. An externally shared preview may still require separate Vercel access.

The hosted Supabase project is **acquafy** (`zfxyprckbcwzscyttwyq`) in **Interfy**, region **US East (Ohio)**. The portal's `feat/portal-app-supabase` branch Preview uses `https://zfxyprckbcwzscyttwyq.supabase.co` and its publishable key through Vercel environment variables. Local development continues to use the isolated local Supabase stack. Never deploy local administrator keys. No production domain promotion is required for branch previews.

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

RLS covers every application table. Direct client business writes are revoked. Public invoker RPCs call guarded command implementations in the unexposed `portal_private` schema. Audit events record the authenticated actor, entity, account and non-message state fields. No service-role key is needed by the deployed app. Suspending an account or revoking membership removes access on the next database request. Already-issued signed download URLs can remain valid for up to 60 seconds.

### Database setup and verification

Apply the tracked migrations with the Supabase CLI to each database before deploying the app. The CLI's `db push --help` documents linking and connection options. Keep the version filenames aligned with the hosted migration history. The configured local Auth stack can continue to run separately; it also needs these migrations before using the live screens.

Run `supabase/tests/functional_portal.sql` through a trusted SQL connection. The suite creates isolated temporary test identities and records inside a transaction, impersonates partner/support/admin/anonymous roles, tests cross-account reads, writes and storage, checks settlement evidence, support, audit, suspension and revocation, and rolls everything back. It must end with its PASS result. No test password, real bank account or live transfer is used.

Application checks: `npm test`, `npm run typecheck --workspace=system`, `npm run lint --workspace=system`, and `npm run build:portal`.

This is a controlled read-only partner release with manual staff publishing and a support queue. Automated payment processing, signature integration, notification delivery, full identity onboarding, real MFA and bank-change workflows remain outside this slice. Supabase's leaked-password-protection advisor warning also remains to be addressed before broader rollout.

For a full HTTP workflow check against a running portal, `scripts/verify-functional-portal.mjs` accepts the origin as its first argument. It uses the ignored initial admin credential file and a privately supplied management-token file via `PORTAL_TEST_TOKEN_FILE`. It creates a randomly named temporary account, publishes a test contract/PDF, exchanges support messages, and verifies database and Storage cleanup in `finally`. Do not interrupt this test while it is cleaning up. `PORTAL_TEST_BYPASS` optionally supplies Vercel automation access for a direct portal preview; no protection credentials are printed.
