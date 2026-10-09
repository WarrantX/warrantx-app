# Submission demo

Use Stellar Testnet accounts and assets only. WarrantX is not audited for mainnet custody.

## Public services

- Open the [WarrantX application](https://warrantx-app.vercel.app).
- Confirm the [API health endpoint](https://warrantx-api.onrender.com/api/v1/health) returns `status: ok`.
- Inspect the [deployed treasury contract](https://stellar.expert/explorer/testnet/contract/CATX47HYXQMHZALH3HYM6JKILXYGPVU324RKQZBPKEJH7TOVAEPMYT2R).

## Wallet and transaction flow

1. Set Freighter to Stellar Testnet and connect it to WarrantX.
2. Review the connected account, network, and configured treasury contract on the dashboard.
3. On **Deposit**, enter a positive testnet asset amount, review the Freighter simulation, and sign. Wait for the transaction-success link.
4. On **Request payment**, enter a recipient, amount, and reason. WarrantX hashes the reason locally, simulates `request_payment`, and asks Freighter to sign.
5. Open the returned Stellar Expert transaction link and verify its contract and status.

Treasury creation remains disabled unless `NEXT_PUBLIC_FACTORY_CONTRACT_ID` is configured. The UI does not simulate a successful deployment when that requirement is missing.
