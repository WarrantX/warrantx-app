# What is WarrantX?

WarrantX is an open-source treasury control platform for organizations operating on Stellar. It separates permission to request a payment from unrestricted control of treasury funds.

An administrator assigns each participant a role and a spending policy. The policy defines how much the participant may spend during a daily, weekly, or monthly period and when a payment needs additional approvals. Soroban contracts evaluate those rules and execute the asset transfer only when every condition is satisfied.

## Who it is for

WarrantX is designed for teams managing shared Stellar assets, including open-source communities, distributed organizations, grant programs, and small operational teams. It is most useful when a single shared wallet or a fixed multisignature threshold is too coarse for day-to-day spending.

## What makes Stellar essential

- **Soroban contracts** make policies and approvals enforceable rather than advisory.
- **Stellar assets** provide a common transfer interface for treasury deposits and payments.
- **Address authorization** ensures administrative, spending, and approval actions are signed by the relevant participant.
- **Ledger events** provide a deterministic source for activity indexing and audit trails.

## Product components

- A Next.js dashboard for treasury operators and members.
- An Express API for authentication and indexed reads.
- A Soroban event indexer backed by PostgreSQL.
- A TypeScript SDK for application integrations.
- Treasury and factory contracts maintained in a separate contract repository.

WarrantX is pre-audit software. Use testnet for evaluation. See [Release status](release-status.md) before deploying.
