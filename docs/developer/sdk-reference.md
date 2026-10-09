# SDK reference

The TypeScript SDK provides a small client for the indexed API.

```ts
import { WarrantXClient } from '@warrantx/sdk';

const client = new WarrantXClient('https://warrantx.example');
const health = await client.getHealth();
const treasuries = await client.getTreasuries();
const payments = await client.getPaymentRequests('C...');
```

## URL selection

- In a browser, the default client uses the current origin and public `/api/v1/*` routes.
- In the Vercel web runtime, it uses the injected `WARRANTX_API_URL` service binding.
- In local server-side development, it falls back to `http://localhost:3001`.
- Pass an explicit URL for scripts, tests, or external integrations.

## Methods

- `getHealth()` checks service availability.
- `getTreasuries()` returns indexed treasury projections.
- `getPaymentRequests(treasuryId)` requests payment projections for a treasury.

Always handle network and non-success HTTP responses in production integrations. The SDK reads indexed state; verify security-sensitive state against Stellar RPC.
