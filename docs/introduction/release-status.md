# Release status

## Current release

WarrantX v0.1 is a testnet preview intended for technical evaluation, contributor onboarding, and end-to-end deployment testing.

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
- The UI still requires completion of the production wallet and transaction flows tracked in GitHub issues.
- Operational monitoring, disaster recovery, and automated testnet smoke deployment remain release work.

## Evaluation guidance

Use funded Stellar testnet accounts only. Verify the network and contract ID in the wallet before signing. Do not reuse test secrets in production and do not deposit assets with real-world value.
