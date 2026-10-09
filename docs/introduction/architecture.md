# Architecture

The application uses a split read/write architecture. The browser reads searchable projections through the API, while wallet-authorized writes go directly to Stellar RPC and the Soroban treasury. The indexer consumes contract events and updates PostgreSQL.

```text
Wallet + browser -> Stellar RPC -> Soroban treasury
       |                              |
       +---------- API <--- indexer <-+
                        PostgreSQL
```

The database is not a source of authority for balances, policies, approvals, or transfers.

## Service responsibilities

| Component | Responsibility | Trust boundary |
| --- | --- | --- |
| Web | User interface, wallet connection, transaction preparation | Never receives a wallet secret |
| API | Challenge verification and indexed read endpoints | Does not authorize contract actions |
| Indexer | Contract event ingestion and read-model updates | Cannot change contract state |
| PostgreSQL | Queryable off-chain projections and checkpoints | Rebuildable from ledger events |
| Soroban treasury | Membership, policy, allowance, approval, and transfer enforcement | Source of truth |
| Factory | Deploys isolated treasury instances from the configured WASM hash | Controlled upgrade surface |

## Vercel deployment topology

The hosted application uses a Vercel Services project. `/api/*` routes to the Express service and all remaining paths route to Next.js. Server-side web calls use the private `WARRANTX_API_URL` service binding. Browser calls use the same public origin, avoiding a separate CORS domain.

The long-running indexer and PostgreSQL database should run on infrastructure designed for persistent processes and durable storage; they are not deployed as request-scoped Vercel Functions.
