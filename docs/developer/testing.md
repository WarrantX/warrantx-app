# Testing and release

## Required checks

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm test
```

The protected `main` branch requires the `app-ci` GitHub check. Pull requests must compile all packages, produce the optimized Next.js build, and pass every available package test.

## Release validation

A release candidate requires an isolated testnet smoke run covering:

- API health and production configuration validation.
- Wallet challenge issuance, signature verification, expiry, and replay rejection.
- Treasury configuration read from Stellar RPC.
- Deposit and indexed deposit event.
- In-policy automatic payment execution.
- Above-threshold payment with distinct approvals.
- Policy update and stale-request rejection.
- Indexer restart from its durable checkpoint.
- Agreement between contract state, explorer transaction, API projection, and UI state.

Record contract IDs, transaction hashes, deployment commit, and test results with the release.
