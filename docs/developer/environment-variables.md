# Environment variables

`DATABASE_URL` is mandatory in production. `AUTH_SECRET` signs one-hour API sessions and must contain at least 32 random characters. `AUTH_ALLOWED_ORIGIN` restricts browser API access. `STELLAR_NETWORK`, `STELLAR_RPC_URL`, and the factory and treasury contract IDs must all describe the same deployment. Variables prefixed with `NEXT_PUBLIC_` are visible in the browser and must never contain secrets.

