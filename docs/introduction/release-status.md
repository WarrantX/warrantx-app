# Release status

## Current release

WarrantX v0.1.1 is a testnet preview intended for technical evaluation and contributor onboarding. The public frontend, API, documentation, and treasury contract are deployed and linked below.

- Frontend: https://warrantx-app.vercel.app
- API health: https://warrantx-api.onrender.com/api/v1/health
- Treasury contract: `CATX47HYXQMHZALH3HYM6JKILXYGPVU324RKQZBPKEJH7TOVAEPMYT2R`
- Contract explorer: https://stellar.expert/explorer/testnet/contract/CATX47HYXQMHZALH3HYM6JKILXYGPVU324RKQZBPKEJH7TOVAEPMYT2R
- Documentation: https://entity-6.gitbook.io/warrantx-documentation

## Implemented

- Treasury and factory Soroban contracts.
- Role-based members and versioned spending policies.
- Daily, weekly, and monthly allowances.
- Automatic and multi-approver payment paths.
- Application monorepo, API, SDK, database schema, and event indexer foundation.
- CI for application builds and contract quality gates.
- Protected release workflow and public issue backlog.

## Not yet a mainnet claim

- The contracts have not completed an independent audit.
- The release does not publish canonical mainnet contract addresses.
- Treasury creation requires a deployed factory ID. Deposit and payment-request screens submit real wallet-signed Soroban transactions when configured.
- Operational monitoring, disaster recovery, and automated testnet smoke deployment remain release work.

## Evaluation guidance

Use funded Stellar testnet accounts only. Verify the network and contract ID in the wallet before signing. Do not reuse test secrets in production and do not deposit assets with real-world value.
