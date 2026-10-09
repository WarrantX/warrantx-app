# Manage a treasury

## Before you begin

Confirm the application is configured for the intended testnet factory, treasury, and asset. The connected wallet must be an active treasury administrator.

## Add a member

Choose the Stellar address and assign the least-privileged role that fits the participant:

- **Administrator:** manages members, policies, and treasury status.
- **Approver:** approves requests above a policy threshold.
- **Spender:** creates payment requests under an assigned policy.
- **Viewer:** read-only organizational role.

Verify the address before signing. Stellar transfers and contract membership changes cannot be redirected after submission.

## Create or replace a policy

Define the spending limit, daily/weekly/monthly period, approval threshold, required approval count, and optional expiry. A replacement increments the policy version. Pending requests created under the older version become stale and cannot execute.

## Suspend access

Suspend a member to stop new authorized actions without deleting its historical activity. Disable a policy to stop new requests for a spender. Suspected treasury-wide incidents should use the treasury suspension flow and the operator response procedure.
