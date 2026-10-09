# WarrantX documentation

WarrantX is a policy-controlled treasury platform built on Stellar. It gives organizations a transparent way to assign spending authority without giving every team member unrestricted access to treasury funds.

Administrators define member roles, recurring allowances, approval thresholds, and policy expiry. Soroban contracts enforce those rules before an asset transfer can occur. The application provides the operational layer: wallet access, transaction preparation, indexed activity, reporting, and developer integrations.

{% hint style="warning" %}
**Release status:** WarrantX v0.1 is a testnet preview. The contracts have not completed an independent security audit and no release should be used to custody material mainnet funds.
{% endhint %}

## Start here

- **Evaluating the project?** Read [What is WarrantX?](introduction/what-is-warrantx.md), [How it works](introduction/how-it-works.md), and [Release status](introduction/release-status.md).
- **Using the application?** Start with [Connect a wallet](using/connecting-your-wallet.md).
- **Integrating WarrantX?** Follow [Local setup](developer/local-setup.md), then review the [API and indexer reference](developer/indexer-api-reference.md).
- **Reviewing security?** Read [Contract security](contract/security.md) and the repository security policy.

## Repositories

- [warrantx-app](https://github.com/WarrantX/warrantx-app): web application, API, event indexer, database package, SDK, and documentation.
- [warrantx-contracts](https://github.com/WarrantX/warrantx-contracts): Soroban treasury and factory contracts.

