# Environment variables

Use `.env.example` as the canonical inventory. Variables prefixed with `NEXT_PUBLIC_` are included in browser bundles and must never contain secrets.

| Variable | Used by | Required in production | Purpose |
| --- | --- | --- | --- |
| `DATABASE_URL` | API, indexer | Yes | PostgreSQL connection string |
| `AUTH_SECRET` | API | Yes | Signs one-hour API sessions; use at least 32 random characters |
| `AUTH_ALLOWED_ORIGIN` | API | Yes | Exact public web origin allowed by CORS |
| `STELLAR_NETWORK` | API, indexer | Yes | `testnet` for the preview deployment |
| `STELLAR_RPC_URL` | Stellar package, indexer | Yes | Soroban RPC endpoint for the selected network |
| `STELLAR_TREASURY_CONTRACT_ID` | API, indexer | Yes | Deployed treasury contract to query and index |
| `STELLAR_FACTORY_CONTRACT_ID` | Application | Yes | Deployed treasury factory contract |
| `NEXT_PUBLIC_STELLAR_NETWORK` | Web | Yes | Network displayed and used by browser transaction code |
| `NEXT_PUBLIC_TREASURY_CONTRACT_ID` | Web | Yes | Treasury ID exposed to the browser |
| `WARRANTX_API_URL` | Web server runtime | Injected | Private Vercel service binding to the API |

## Rules

- All Stellar variables must refer to the same network and deployment.
- Do not create `WARRANTX_API_URL` manually in Vercel; the service binding owns it.
- Rotate `AUTH_SECRET` if it is exposed. Rotation invalidates existing API sessions.
- Use a pooled PostgreSQL URL when the hosting provider recommends one for serverless functions.
- Never store a Stellar secret key in the web or API environment.
