# Indexer and API reference

The API exposes `GET /api/v1/health`, `POST /api/v1/auth/challenge`, `POST /api/v1/auth/verify`, `GET /api/v1/treasuries`, `GET /api/v1/payments`, and `GET /api/v1/policies`. The indexer polls only the configured treasury contract and persists a ledger checkpoint. Consumers must tolerate ledger-close latency and duplicate delivery.

