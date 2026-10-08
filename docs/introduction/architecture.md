# Architecture

The browser reads indexed data through the API and prepares wallet-signed contract calls. Writes go to Stellar RPC and the treasury contract. The indexer consumes events from the configured contract and stores queryable projections in PostgreSQL.

```text
Wallet + browser -> Stellar RPC -> Soroban treasury
       |                              |
       +---------- API <--- indexer <-+
                        PostgreSQL
```

The database is not a source of authority for balances, policies, approvals, or transfers.

