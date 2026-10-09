# How to contribute

## Find work

Choose an unassigned issue with a clear scope and acceptance criteria. Comment before starting substantial work so maintainers can confirm direction and dependencies.

## Development workflow

1. Fork or branch from the latest `main`.
2. Make one focused change and add tests for behavior changes.
3. Update documentation when interfaces, configuration, or operations change.
4. Run `pnpm build` and `pnpm test`.
5. Use a conventional commit subject such as `fix(api): reject replayed challenge`.
6. Open a pull request and complete its validation checklist.

The protected branch requires the real `app-ci` check. Keep generated output, dependencies, secrets, and local environment files out of commits.

## Security changes

Changes involving authentication, wallet transactions, contract arguments, authorization, or indexed accounting require explicit security reasoning in the pull request. Unpatched vulnerabilities must follow `SECURITY.md` instead of a public issue.

## Code of conduct

Participation is governed by the repository `CODE_OF_CONDUCT.md`. Be specific, respectful, and focused on verifiable technical outcomes.
