# Contract security

Sensitive operations require Stellar address authorization in the contract. The application must never substitute API authentication for contract authorization.

## Security properties

- Initialization can occur only once.
- Administrative operations require an active administrator.
- Spending requires an active member and active policy.
- Payment amounts must be positive and remain within the current-period allowance.
- Requests retain their policy version; replacing a policy invalidates stale requests.
- Approval records prevent duplicate approvals.
- Executed requests cannot execute twice.
- Transfers check treasury balance before calling the token contract.

## Operator responsibilities

- Verify the network, contract ID, asset, recipient, and amount before signing.
- Protect administrator and approver keys with appropriate wallet and device controls.
- Treat RPC responses, indexer output, and browser state as untrusted until reconciled with the ledger.
- Suspend a treasury and stop application writes when an authorization or accounting defect is suspected.
- Keep database backups, but remember that restoring the database cannot reverse contract state.

## Responsible disclosure

Do not publish unpatched vulnerabilities in GitHub issues. Use the private vulnerability-reporting flow described in the repository `SECURITY.md`.

The contracts have not completed an independent audit. Do not deploy material value on mainnet until the audit and incident-response work in the public issue tracker are complete.
