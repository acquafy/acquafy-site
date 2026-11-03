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

Both roles can use the portal and download its sample documents. `/app/base/*` and `/app/m/duo/*` require `internal`. The old demo cookie, referer and preview-query bypasses have been removed. Login thumbnails are available only to authenticated internal users. Unconfigured or unavailable authentication keeps protected routes locked. Private responses are not cached.

Local self-registration is disabled globally. Provision confirmed accounts through Supabase administration and assign `portal_role` using its Admin API or database administration. For example, after creating the account:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"portal_role":"internal"}'::jsonb
where email = 'approved-user@example.com';
```

Use `partner` for a partner account. Remove `portal_role` to withdraw access. Access requests and password recovery direct users to their Acquafy administrator; the interface no longer claims to send emails or create accounts. Portal business records and profile editing remain the existing sample data/local browser state; connecting real, user-scoped records requires a separate data integration with RLS.

## Vercel branch previews

Both projects belong to team **Interfy** and use this Git repository:

| Project | Root directory | Build | Purpose |
| --- | --- | --- | --- |
| `acquafy-site` | repository root | `npm run build:site` | Website and `/app` forwarding |
| `acquafy-portal` | `system` | `npm run build` | Portal with `basePath: /app` |

Deploy the portal preview first, then set the website's **branch-scoped Preview** `PORTAL_ORIGIN` to that portal deployment's HTTPS origin. Build the website preview afterward. This binds the website preview to the exact portal build under test. The origin excludes `/app`; the rewrites add it. Repoint this variable when deploying a new portal revision.

Vercel deployment protection stays enabled. Interfy members authenticated on the website preview can follow Vercel's protected rewrites to the portal in the same team. An externally shared preview may still require separate Vercel access.

Local Supabase cannot be reached from Vercel. Leave the portal's Supabase environment variables unset on Preview while using local Supabase; `/app/login` renders, and sign-in reports service unavailability. To enable remote login later, configure a reachable `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` on the portal project and provision approved accounts. Never deploy local administrator keys. No production domain promotion is required for branch previews.

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
