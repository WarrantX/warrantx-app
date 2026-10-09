# Smart contract overview

The contract repository contains a treasury contract and a deployment factory.

## Treasury contract

Each treasury is isolated to one organization and one Stellar asset. It owns:

- Treasury status and administrator configuration.
- Member roles and active or suspended state.
- Versioned spending policies.
- Per-period allowance accounting.
- Payment requests and approval records.
- SEP-41-compatible token deposits and transfers.

Public write functions include initialization, deposits, member management, policy management, payment requests, approvals, cancellation, execution, and treasury suspension. Read functions expose configuration, member and policy state, allowance consumption, requests, and approval status.

## Factory contract

The factory stores an administrator-controlled treasury WASM hash and deploys deterministic treasury instances. Deployment order matters: build the treasury WASM, upload it, initialize the factory with its hash, then deploy individual treasuries.

## Authority model

The contract—not the API or database—is authoritative. Administrative functions require an authorized administrator. Payment requests require the spender. Approvals require an eligible approver. Token transfers occur only inside validated contract execution.

See [warrantx-contracts](https://github.com/WarrantX/warrantx-contracts) for exact Rust signatures, types, events, tests, and release artifacts.
