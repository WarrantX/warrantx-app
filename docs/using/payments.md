# Request and approve payments

## Request a payment

1. Enter the recipient's Stellar address.
2. Enter a positive amount in the treasury asset.
3. Add a concise payment description. WarrantX commits its hash on-chain; sensitive information should not be included.
4. Review the active allowance, approval threshold, and expected path.
5. Inspect the wallet simulation and sign the request.

An amount at or below the threshold can execute automatically if allowance and balance checks pass. A larger amount enters the pending approval state.

## Approve a payment

Approvers should independently verify the recipient, amount, reason, treasury, and policy version. Each eligible address can approve once. Reaching the required count marks the request ready for execution; it does not bypass the final policy, expiry, allowance, or balance checks.

## Confirm execution

Verify the transaction in a Stellar explorer and compare the recipient balance with the dashboard activity. If the API has not updated, allow for ledger-close and indexer delay before reporting a discrepancy.

## Common rejection reasons

- The member or treasury is suspended.
- The policy is disabled, expired, or has been replaced.
- The recurring allowance would be exceeded.
- The request has expired, was cancelled, or already executed.
- The approval count is insufficient.
- The treasury asset balance is insufficient.
