# Contract security

Sensitive operations require Stellar address authorization in the contract. The application must never substitute API authentication for contract authorization. Treat contract IDs, network passphrases, RPC endpoints, and token addresses as deployment configuration and verify them before signing.

The contracts have not completed an independent audit. Do not deploy material value on mainnet until the audit and incident-response work in the public issue tracker are complete.

