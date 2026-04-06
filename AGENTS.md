# Modalogue Agent Guide

This file is the canonical operational guide for autonomous coding agents working in this repository.

## Repository map

- `packages/core`: framework-agnostic modal state engine (`@modalogue/core`)
- `packages/react`: React bindings and styles (`@modalogue/react`)
- `www`: Next.js demo/website app (`modalogue-website`)
- `tests/integration`: cross-package React integration tests
- `tests/e2e`: Playwright browser tests against the `www` app

## Ground truth files

- API implementation: `packages/core/src/index.ts`
- API types: `packages/core/src/types.ts`
- Unit behavior: `packages/core/tests/unit/modal.test.ts`
- React integration behavior: `tests/integration/react-integration.test.tsx`
- Browser behavior: `tests/e2e/modal.spec.ts`

## Core behavioral rules

- `Modalogue` is instance-based (not a singleton).
- Use one shared instance per modal system in an app unless intentional isolation is required.
- `open(content)` resets history and sets first view (`id: 0`).
- `navigate(content)` pushes a view onto history.
- `back()` pops history, but closes modal when depth is `1`.
- `close()` hides modal and clears history.
- `hide()` hides modal without clearing history; `show()` restores visibility.

## Commands (repo root)

- Install deps: `pnpm install`
- Dev (all workspace packages): `pnpm dev`
- Build all: `pnpm build`
- Type-check all: `pnpm type-check`
- Unit tests: `pnpm test:unit`
- Integration tests: `pnpm test:integration`
- E2E tests: `pnpm test`

## Runtime assumptions

- Playwright `baseURL` is `http://localhost:3000`.
- The website app in `www` is the target runtime for E2E.
- App-level singleton pattern example lives at `www/src/app/modalogue-instance.ts`.

## Guardrails for edits

- Keep `packages/core` headless and dependency-free.
- Do not couple core to React or DOM rendering decisions.
- When API semantics change, update:
  - `packages/core/src/types.ts`
  - tests in `packages/core/tests/unit` and `tests/integration`
  - docs in root/package READMEs and `llms.txt`

## Recommended autonomous workflow

1. Read API and tests before editing behavior.
2. Make the smallest change that satisfies behavior.
3. Run `pnpm test:unit`, then `pnpm test:integration`, then `pnpm test`.
4. Update docs when contracts or commands change.
