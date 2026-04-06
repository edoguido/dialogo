# @dialogo/core

Headless state management for multi-step dialogs. Framework-agnostic with zero dependencies.

## Installation

```bash
npm install @dialogo/core
# or
pnpm add @dialogo/core
# or
yarn add @dialogo/core
```

## Usage

```typescript
import Dialogo from '@dialogo/core';

// Create a new instance
const dialogo = new Dialogo();

// Subscribe to state changes
const unsubscribe = dialogo.subscribe((state) => {
  console.log('Modal state:', state);
  // state.isOpen - boolean
  // state.activeView - { id, element }
  // state.hasHistory - boolean
});

// Open a modal with content
dialogo.open(<YourContent />);

// Navigate to a new view (adds to history)
dialogo.navigate(<NextView />);

// Go back to previous view
dialogo.back();

// Close modal and clear history
dialogo.close();

// Hide modal without clearing history
dialogo.hide();

// Show hidden modal
dialogo.show();

// Clean up subscription
unsubscribe();
```

## API

### `new Dialogo()`

Creates a new Dialogo instance.

### `dialogo.subscribe(callback): () => void`

Subscribe to state changes. Returns an unsubscribe function.

### `dialogo.open(content): void`

Opens the modal with the given content. Clears any existing history.

### `dialogo.navigate(content): void`

Navigates to new content, preserving history for back navigation.

### `dialogo.back(): void`

Goes back to the previous view. If on the first view, closes the modal.

### `dialogo.close(): void`

Closes the modal and clears all history.

### `dialogo.hide(): void`

Hides the modal without clearing history (can be shown again).

### `dialogo.show(): void`

Shows a previously hidden modal.

## Types

```typescript
import type { ModalState, ModalContent, ActiveView, Subscriber, ModalAPI } from '@dialogo/core';
```

## License

MIT
