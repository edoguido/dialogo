# Modalogue Website (`www`)

This app is the Next.js demo/website for Modalogue. It is used as:

- the interactive reference implementation for modal behavior
- the runtime target for Playwright E2E tests

## Run locally

From repo root:

```bash
pnpm dev:website
```

Or from this folder:

```bash
pnpm dev
```

Default URL: `http://localhost:3000`

## Relationship to the monorepo

- Depends on `@modalogue/core` via workspace dependency.
- Demonstrates a shared instance pattern in `src/app/modalogue-instance.ts`.
- Contains app-level rendering behavior in `src/app/modal.tsx`.

## Testing

E2E tests in `../tests/e2e` target this app using Playwright `baseURL` `http://localhost:3000`.

Common root commands:

```bash
pnpm test:unit
pnpm test:integration
pnpm test
```
