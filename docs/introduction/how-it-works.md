# How it works

## Treasury setup

1. A factory deploys an isolated treasury contract from an approved WASM hash.
2. The treasury is initialized with an administrator, a Stellar asset contract, and an organization identifier.
3. The administrator deposits assets and adds members as administrators, approvers, spenders, or viewers.
4. Each spender receives a versioned policy containing a spending limit, reset period, approval threshold, required approval count, and optional expiry.

## Payment flow

1. A spender enters the recipient, amount, and payment description.
2. The application hashes the metadata and prepares a `request_payment` contract call.
3. The wallet displays the simulation and requests the spender's signature.
4. The treasury verifies the member, current policy version, remaining allowance, expiry, and treasury balance.
5. An in-policy payment at or below the approval threshold can execute immediately.
6. A larger payment remains pending until enough distinct active approvers sign it.
7. Once valid, the contract transfers the configured Stellar asset and emits an execution event.

## Read model

The event indexer reads only events from the configured treasury contract. It stores searchable projections in PostgreSQL for the dashboard and API. Indexed data can lag by one or more ledger closes and must not be treated as authority for balances, permissions, or payment execution.
