# @modalogue/core

Headless state management for multi-step dialogs. Framework-agnostic with zero dependencies.

## Installation

```bash
npm install @modalogue/core
# or
pnpm add @modalogue/core
# or
yarn add @modalogue/core
```

## Usage

```typescript
import Modalogue from '@modalogue/core';

// Create a new instance
const modalogue = new Modalogue();

// Subscribe to state changes
const unsubscribe = modalogue.subscribe((state) => {
  console.log('Modal state:', state);
  // state.isOpen - boolean
  // state.activeView - { id, element }
  // state.hasHistory - boolean
});

// Open a modal with content
modalogue.open(<YourContent />);

// Navigate to a new view (adds to history)
modalogue.navigate(<NextView />);

// Go back to previous view
modalogue.back();

// Close modal and clear history
modalogue.close();

// Hide modal without clearing history
modalogue.hide();

// Show hidden modal
modalogue.show();

// Clean up subscription
unsubscribe();
```

## API

### `new Modalogue()`

Creates a new Modalogue instance.

### `modalogue.subscribe(callback): () => void`

Subscribe to state changes. Returns an unsubscribe function.

### `modalogue.open(content): void`

Opens the modal with the given content. Clears any existing history.

### `modalogue.navigate(content): void`

Navigates to new content, preserving history for back navigation.

### `modalogue.back(): void`

Goes back to the previous view. If on the first view, closes the modal.

### `modalogue.close(): void`

Closes the modal and clears all history.

### `modalogue.hide(): void`

Hides the modal without clearing history (can be shown again).

### `modalogue.show(): void`

Shows a previously hidden modal.

## Types

```typescript
import type { ModalState, ModalContent, ActiveView, Subscriber, ModalAPI } from '@modalogue/core';
```

## License

MIT
