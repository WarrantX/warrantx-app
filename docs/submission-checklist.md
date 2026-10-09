# Submission checklist

Use this page to evaluate whether a WarrantX release is ready for a Stellar ecosystem submission.

## Repository readiness

- [x] Separate application and contract repositories.
- [x] Public descriptions, topics, licenses, contribution guides, and security policies.
- [x] Protected primary branches with required CI.
- [x] Tagged preview releases.
- [x] Structured contributor backlog.
- [x] User and developer documentation.

## Product evidence

- [ ] Public application deployment.
- [ ] Public documentation URL.
- [ ] Canonical Stellar testnet factory and treasury contract IDs.
- [ ] Explorer links for deployment and representative transactions.
- [ ] End-to-end smoke-test record.
- [ ] Short demo video showing treasury setup, deposit, policy, request, approval, and execution.

## Security and operations

- [ ] Independent contract audit or clearly accepted pre-audit program status.
- [ ] Storage TTL strategy and tests.
- [ ] Monitoring and alerting for API, indexer, database, and RPC failures.
- [ ] Backup, restore, rollback, and incident-response runbooks exercised.
- [ ] Production wallet and transaction flows completed and reviewed.

## Submission package

- [ ] Confirm WarrantX is not already present in the current approved-project list.
- [ ] Include application, repositories, documentation, explorer, and demo links.
- [ ] Explain how `warrantx-app` and `warrantx-contracts` work together.
- [ ] Summarize planned work using the real public issue backlog.
- [ ] State the pre-audit/testnet boundary without implying mainnet readiness.

The unchecked items are release gates, not optional polish.
