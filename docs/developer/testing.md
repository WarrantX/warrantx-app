# Testing and release

Run `pnpm build` and `pnpm test` before every pull request. CI repeats both checks on Node.js 20. A release candidate also requires a testnet smoke test covering wallet challenge, treasury read, payment request, approval, execution, event ingestion, and API projection.

