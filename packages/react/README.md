# @modalogue/react

React bindings for Modalogue.

`@modalogue/react` provides a composable UI shell and hook on top of `@modalogue/core` while keeping state management in the core package.

## Installation

```bash
pnpm add @modalogue/react @modalogue/core
```

Peer dependencies:

- `react` (>=18)
- `motion`
- `@modalogue/core`

## CSS import

```tsx
import '@modalogue/react/styles.css';
```

## Quick usage

```tsx
import ModalogueCore from '@modalogue/core';
import Modal, { useModal, Modalogue } from '@modalogue/react';
import '@modalogue/react/styles.css';

const modalogue = new ModalogueCore();

export function AppModal() {
  const state = useModal(modalogue);
  if (!state.isOpen) return null;

  return <Modal modalogue={modalogue} />;
}

export function OpenButton() {
  return (
    <button onClick={() => modalogue.open(<div>Hello from Modalogue</div>)}>
      Open modal
    </button>
  );
}
```

## Exports

- Default export: `Modal`
- Named exports: `useModal`, `Modalogue` (compound components)
- Types: `ModalProps`

## Relationship to `@modalogue/core`

- Core owns modal state transitions (`open`, `navigate`, `back`, `close`, `hide`, `show`).
- React package renders UI using a `modalogue: ModalAPI` instance you provide.
- Keep one shared core instance per modal system unless you explicitly need isolated systems.
