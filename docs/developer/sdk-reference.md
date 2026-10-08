# SDK reference

Create `WarrantXClient` with the deployed API URL. `getHealth()` checks service readiness, `getTreasuries()` returns indexed treasury projections, and `getPaymentRequests(treasuryId)` lists indexed requests for a treasury. Always handle non-2xx responses and verify important state against Stellar RPC.

