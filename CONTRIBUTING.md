# Contributing to Modalogue

Thanks for contributing. This guide reflects the current monorepo layout and commands.

## Prerequisites

- Node.js 18+
- pnpm 8+
- Git

## Development setup

```bash
git clone https://github.com/edoardoguido/modalogue.git
cd modalogue
pnpm install
```

## Project structure

```text
modalogue/
├── packages/
│   ├── core/                 # @modalogue/core (headless engine)
│   └── react/                # @modalogue/react bindings + styles
├── tests/
│   ├── integration/          # Vitest integration tests
│   └── e2e/                  # Playwright tests
├── www/                      # Next.js demo and website
├── AGENTS.md                 # Agent and automation guide
└── package.json              # Root turbo/pnpm scripts
```

## Core principles

- Keep `@modalogue/core` zero-dependency and headless.
- Preserve framework-agnostic API contracts.
- Favor clear, small changes over broad refactors.
- Update tests and docs when behavior changes.

## Behavioral contract (important)

- Modalogue is instance-based, not a singleton.
- `open()` resets history.
- `navigate()` pushes history.
- `back()` closes when at first view.
- `close()` clears history.
- `hide()` only toggles visibility (history is preserved).

## Commands (run from repo root)

```bash
# Development
pnpm dev
pnpm build
pnpm type-check

# Testing
pnpm test:unit
pnpm test:integration
pnpm test

# Formatting
pnpm format
```

## Testing expectations

Before opening a PR, run:

1. `pnpm test:unit`
2. `pnpm test:integration`
3. `pnpm test`

If your change touches API behavior, update:

- `packages/core/src/types.ts`
- `packages/core/tests/unit/modal.test.ts`
- `tests/integration/react-integration.test.tsx` (if applicable)
- relevant docs (`README.md`, package READMEs, `AGENTS.md`, `llms.txt`)

## Pull requests

- Use a focused branch and concise commit messages.
- Describe what changed and why.
- Include any behavior changes and test coverage notes.
- Link related issues when available.

## Need context?

- Start with `AGENTS.md` for authoritative operational guidance.
- Use root `README.md` for package usage and examples.
