# How it works

1. An administrator deploys and initializes a treasury contract.
2. The administrator adds members and assigns roles.
3. A spending policy defines a limit, reset period, approval threshold, and expiry.
4. A spender submits a payment request signed by their Stellar wallet.
5. The contract executes an in-policy payment or waits for the required approvers.
6. The indexer records contract events for search and reporting. Contract state remains authoritative.

