# Troubleshooting

## The web app loads but API requests return 404

Confirm the Vercel project preset is **Services**, the root directory is the repository root, and `vercel.json` is present on the deployed branch. Requests must use `/api/v1/*` because the API receives the original public path.

## `WARRANTX_API_URL` is missing

Do not create it manually. Confirm the `web` service declares a binding to `api` and that the call runs at function runtime rather than during a build or in middleware.

## Authentication returns 500

Set `AUTH_SECRET` to at least 32 random characters. Confirm `AUTH_ALLOWED_ORIGIN` exactly matches the deployed web origin, including scheme and without an unintended trailing path.

## The indexer starts and immediately exits

Set `STELLAR_TREASURY_CONTRACT_ID`. Confirm the RPC endpoint and contract belong to `STELLAR_NETWORK`, and provide a reachable PostgreSQL `DATABASE_URL` in production.

## Data differs from the explorer

The API serves an indexed projection. Check the latest indexer ledger checkpoint, RPC availability, contract event filter, and failed event logs. Treat the ledger as authoritative while the indexer catches up.

## The interface says “Demo Preview”

Set `NEXT_PUBLIC_TREASURY_CONTRACT_ID` before building the web service. Public variables are embedded at build time, so redeploy after changing them.
