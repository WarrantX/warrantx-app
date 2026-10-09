# WarrantX App

[![CI](https://github.com/Michealshodipo56/warrantx-app/actions/workflows/ci.yml/badge.svg)](https://github.com/Michealshodipo56/warrantx-app/actions/workflows/ci.yml)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-black)](https://stellar.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live application](https://warrantx-app.vercel.app) · [Documentation](https://entity-6.gitbook.io/warrantx-documentation) · [Testnet contract](https://stellar.expert/explorer/testnet/contract/CATX47HYXQMHZALH3HYM6JKILXYGPVU324RKQZBPKEJH7TOVAEPMYT2R) · [API health](https://warrantx-api.onrender.com/api/v1/health)

WarrantX is an open-source Stellar treasury application for teams that need enforceable spending limits, recurring allowances, and multi-approver payments. This repository contains the web dashboard, API, event indexer, shared UI and validation packages, and TypeScript SDK. The companion contracts repository is the source of authority for treasury state and transfers.

> **Release status:** v0.1.1 is a testnet-only preview. The contracts are unaudited. Do not use this release to custody material mainnet funds.

## Architecture

```text
Wallet + Next.js -> Stellar RPC -> WarrantX contracts
       |                              |
       +------ Express API <- indexer-+
                    |
                PostgreSQL
```

The API database is an indexed projection, never the authority for balances or approvals.

## Quick start

Requires Node.js 20 and pnpm 9.

```bash
cp .env.example .env
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

Add testnet contract IDs and a 32-character `AUTH_SECRET` before testing authenticated or on-chain flows. See [the documentation](docs/SUMMARY.md) for setup, concepts, user guides, and API details.

## Repository map

- `apps/web`: Next.js dashboard
- `apps/api`: Express API and wallet challenge flow
- `services/indexer`: Soroban event ingestion
- `packages/stellar`: network, auth, and contract helpers
- `packages/sdk`: API client
- `packages/database`: Drizzle schema and database adapter
- `packages/ui`, `packages/validation`: shared components and schemas

## Quality gates

Pull requests must pass the `app-ci` check, which installs the locked dependency graph, compiles every workspace package, builds the production web bundle, and runs package tests. Production deployments must provide PostgreSQL, explicit Stellar network and contract configuration, restricted CORS origin, and a strong authentication secret.

## Maintainer

| Maintainer | GitHub |
| --- | --- |
| Micheal Shodipo | [@Michealshodipo56](https://github.com/Michealshodipo56) |

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and [SECURITY.md](SECURITY.md) for private vulnerability reporting. By participating, you agree to [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Contributors

<a href="https://github.com/Michealshodipo56/warrantx-app/graphs/contributors"><img src="https://contrib.rocks/image?repo=Michealshodipo56/warrantx-app" alt="WarrantX contributors" /></a>

## License

MIT. See [LICENSE](LICENSE).
