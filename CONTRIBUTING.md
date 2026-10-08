# Contributing to WarrantX App

Use a public issue to agree scope before a large change. Fork the repository, branch from `main`, and submit a focused pull request.

Run `pnpm install --frozen-lockfile`, `pnpm build`, and `pnpm test` locally. New behavior needs tests; configuration changes need documentation. Use conventional commit subjects such as `fix(api): reject expired challenge`.

Never commit wallet secrets, private RPC credentials, `.env` files, or production data. Report vulnerabilities through the process in `SECURITY.md`.

