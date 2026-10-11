# Deployment

## Application services

The repository contains a Vercel Services configuration for the public web service:

- `web` serves Next.js at `/*`.

The web service handles `/api/*` through a server-side proxy. It tries the primary API first and automatically uses the fallback after a network error, an eight-second timeout, rate limiting, or a server error.

## Deploy to Vercel

1. Import `WarrantX/warrantx-app` from GitHub.
2. Select the **Services** application preset and keep the repository root as the root directory.
3. Confirm Vercel detects `web` from `vercel.json`.
4. Add the required variables listed in [Environment variables](environment-variables.md). The hosted primary and fallback API origins work without additional variables.
5. Deploy a preview and verify `/` and `/api/v1/health`.
6. Promote only after the smoke checks below pass.

## Deploy the indexer and database

Run PostgreSQL and the indexer on persistent infrastructure in the same region. The indexer is a long-running polling process and should not run as a request-scoped Vercel Function.

Configure `DATABASE_URL`, `STELLAR_NETWORK`, `STELLAR_RPC_URL`, and `STELLAR_TREASURY_CONTRACT_ID`. Start the compiled indexer with its package start command and confirm the checkpoint advances.

## Smoke checks

- `GET /api/v1/health` returns `status: ok`.
- The landing page and dashboard load without browser errors.
- The displayed network and treasury ID match the intended testnet deployment.
- A wallet challenge can be issued and consumed only once.
- Treasury events advance the indexer checkpoint and appear through the API.
- A test payment can be requested, approved when required, executed, and verified on a Stellar explorer.

## Rollback

Rollback the web and API deployment through Vercel. Do not roll back the database independently unless the schema and application versions are compatible. A contract deployment is immutable; remediation requires suspending the affected treasury where possible and deploying a reviewed replacement.
