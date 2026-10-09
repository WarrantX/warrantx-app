# Indexer and API reference

The API is mounted at `/api` on the shared application domain. JSON is used for request and response bodies.

## Health

`GET /api/v1/health`

```json
{
  "status": "ok",
  "service": "WarrantX API",
  "timestamp": "2026-10-09T12:00:00.000Z"
}
```

## Wallet authentication

`POST /api/v1/auth/challenge`

```json
{ "publicKey": "G..." }
```

Returns a short-lived challenge and expiry. Sign the exact challenge bytes with the corresponding Stellar key.

`POST /api/v1/auth/verify`

```json
{
  "publicKey": "G...",
  "challenge": "WarrantX-Auth:...",
  "signature": "base64-signature"
}
```

A valid, unexpired, unused challenge returns an authenticated subject and signed session token. Reusing a consumed challenge returns `401`.

## Indexed resources

- `GET /api/v1/treasuries`
- `GET /api/v1/payments?treasuryId=<contract-id>`
- `GET /api/v1/policies`

These endpoints return database projections. Confirm critical balances and execution state against Stellar RPC.

## Indexer behavior

The indexer filters events to `STELLAR_TREASURY_CONTRACT_ID`, stores a durable ledger checkpoint, and must process events idempotently. Consumers should tolerate ledger-close latency and temporary differences between indexed and on-chain state.

{% hint style="info" %}
Pagination, complete event materialization, and authenticated route middleware are tracked in the public application backlog. Treat the current API as preview-stage.
{% endhint %}
