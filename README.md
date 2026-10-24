# HCM Lite

AI-assisted human capital management for growing teams.

## Phase 1

- Responsive first-run workspace setup for a company and Admin account.
- Server-ready RBAC contracts for Admin, HR, and Employee scope checks.
- Setup validation contracts and focused Node business-rule tests.
- Environment template with no committed secrets.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local preview and complete the setup flow. The current UI is intentionally empty-state-first; no seed data is created.

## Environment

Copy `.env.example` to your local environment. `ADMIN_EMAIL` and `ADMIN_PASSWORD` can prefill bootstrap credentials in the backend when auth is wired. `AI_API_KEY` is reserved for server-side AI calls in Phase 8. `MONGODB_URI` and `JWT_SECRET` are reserved for Phase 2 auth and persistence.

## Build order

Phase 1 foundation is complete. Next: MongoDB persistence, first-run bootstrap API, JWT sessions, and server-side RBAC middleware.
