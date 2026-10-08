# Local setup

Requires Node.js 20 and pnpm 9. Copy `.env.example` to `.env`, provide a development database and testnet contract IDs, then run:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

Use only testnet keys in local files. Never commit secret keys.

