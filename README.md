# Dialogo

> **Framework-agnostic modal state management**

Dialogo is a zero-dependency, headless modal engine that provides powerful state management with navigation history. Unlike traditional modal libraries, Dialogo is completely unopinionated about UI and works with any framework or vanilla JavaScript. It focuses purely on state management, letting you handle rendering however you prefer.

## ✨ Features

- **🔧 Truly Framework Agnostic**: Works with React, Vue, Svelte, vanilla JavaScript, or any framework - no type conflicts
- **📱 Navigation History**: Built-in back/forward navigation with history management
- **🎯 Singleton Pattern**: Global state management with automatic cleanup
- **⚡ Zero Dependencies**: No external dependencies, truly lightweight
- **🔄 Reactive**: Real-time state updates with subscriber pattern
- **🎨 Headless**: Completely unopinionated about UI - you control the presentation
- **🔗 Flexible Content**: Accepts any content type - React elements, Vue components, HTML strings, DOM elements, or any framework objects

## 🚀 Quick Start

```bash
npm install dialogo
# or
yarn add dialogo
# or
pnpm add dialogo
```

### Basic Usage

#### With React

```tsx
import { useEffect, useState } from 'react';
import Dialogo from 'dialogo';

const dialogo = new Dialogo();

function MyApp() {
  const [modalState, setModalState] = useState(null);

  useEffect(() => {
    // Subscribe to modal state changes
    const unsubscribe = dialogo.subscribe(setModalState);
    return unsubscribe;
  }, []);

  const openModal = () => {
    dialogo.open(<div>Hello from Dialogo!</div>);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      {modalState?.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalState.activeView.element}
            <button onClick={() => dialogo.close()}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

#### With Vanilla JavaScript

```javascript
import Dialogo from 'dialogo';

const dialogo = new Dialogo();

// Subscribe to modal state changes
const unsubscribe = dialogo.subscribe((state) => {
  const modalElement = document.getElementById('modal');
  const content = document.getElementById('modal-content');

  if (state.isOpen) {
    modalElement.style.display = 'flex';

    // Handle different content types
    if (typeof state.activeView.element === 'string') {
      content.innerHTML = state.activeView.element;
    } else if (state.activeView.element instanceof Element) {
      content.innerHTML = '';
      content.appendChild(state.activeView.element);
    } else {
      content.innerHTML = String(state.activeView.element || '');
    }
  } else {
    modalElement.style.display = 'none';
  }
});

// Open modal with HTML content
document.getElementById('open-btn').addEventListener('click', () => {
  dialogo.open('<div>Hello from Dialogo!</div>');
});

// Close modal
document.getElementById('close-btn').addEventListener('click', () => {
  dialogo.close();
});
```

#### With DOM Elements

```javascript
import Dialogo from 'dialogo';

const dialogo = new Dialogo();

// Create a DOM element
const contentElement = document.createElement('div');
contentElement.innerHTML = '<h2>Dynamic Content</h2><p>This is a DOM element!</p>';

// Open modal with DOM element
document.getElementById('open-dom-btn').addEventListener('click', () => {
  dialogo.open(contentElement);
});
```

## 📖 API Reference

### Core Methods

#### `dialogo.open(content: ModalContent)`

Opens a new modal with the provided content, resetting the navigation history. Accepts any content type - React elements, HTML strings, DOM elements, or any framework objects.

```tsx
// With React
dialogo.open(<div>Welcome to the first step!</div>);

// With HTML string
dialogo.open('<div>Welcome to the first step!</div>');

// With DOM element
const element = document.createElement('div');
element.textContent = 'Welcome!';
dialogo.open(element);

// With any framework component
dialogo.open(anyFrameworkComponent);
```

#### `dialogo.navigate(content: ModalContent)`

Navigate to a new view while preserving history. Accepts any content type - React elements, HTML strings, DOM elements, or any framework objects.

```tsx
// With React
dialogo.navigate(<div>This is the second step!</div>);

// With HTML string
dialogo.navigate('<div>This is the second step!</div>');

// With DOM element
const element = document.createElement('div');
element.textContent = 'Second step!';
dialogo.navigate(element);

// With any framework component
dialogo.navigate(anyFrameworkComponent);
```

#### `dialogo.back()`

Goes back to the previous view. Closes the modal if no history exists.

```tsx
dialogo.back();
```

#### `dialogo.close()`

Closes the modal and clears all history.

```tsx
dialogo.close();
```

#### `dialogo.hide()` / `dialogo.show()`

Temporarily hides or shows the modal without affecting history.

```tsx
dialogo.hide(); // Hide but preserve state
dialogo.show(); // Show again
```

#### `dialogo.subscribe(callback: (state: ModalState) => void)`

Subscribe to modal state changes. Returns an unsubscribe function.

```tsx
const unsubscribe = dialogo.subscribe((state) => {
  console.log('Modal state changed:', state);
});

// Later...
unsubscribe();
```

### Type Definitions

```tsx
/**
 * Framework-agnostic content type for modal content.
 * Accepts any content type - React elements, Vue components, HTML strings, DOM elements, or any framework objects.
 */
type ModalContent<T = any> = T;

type ModalState = {
  isOpen: boolean;
  activeView: { element: ModalContent; id: number } | null;
  hasHistory: boolean;
};
```

## 🔧 Framework Compatibility

Dialogo is designed to work seamlessly with any JavaScript framework without type conflicts:

### React

```tsx
dialogo.open(<MyComponent />);
dialogo.navigate(<AnotherComponent />);
```

### Vue

```javascript
dialogo.open(vueComponent);
dialogo.navigate(anotherVueComponent);
```

### Svelte

```javascript
dialogo.open(svelteComponent);
dialogo.navigate(anotherSvelteComponent);
```

### Vanilla JavaScript

```javascript
dialogo.open(document.createElement('div'));
dialogo.navigate('<div>HTML string</div>');
```

### Any Framework

```javascript
// Works with any framework's component objects
dialogo.open(anyFrameworkComponent);
dialogo.navigate(anotherFrameworkComponent);
```

## 🎯 Advanced Examples

### Multi-step Form

```tsx
import Dialogo from 'dialogo';

const dialogo = new Dialogo();

function MultiStepForm() {
  const openForm = () => {
    dialogo.open(
      <div>
        <h2>Step 1: Personal Info</h2>
        <input placeholder="Name" />
        <button
          onClick={() => {
            dialogo.navigate(
              <div>
                <h2>Step 2: Contact</h2>
                <input placeholder="Email" />
                <button onClick={() => dialogo.back()}>Back</button>
                <button onClick={() => dialogo.close()}>Submit</button>
              </div>,
            );
          }}
        >
          Next
        </button>
      </div>,
    );
  };

  return <button onClick={openForm}>Start Form</button>;
}
```

### Framework Integration Examples

#### With Vanilla JavaScript

```javascript
import Dialogo from 'dialogo';

const dialogo = new Dialogo();

class ModalManager {
  constructor() {
    this.modalElement = document.getElementById('modal');
    this.content = document.getElementById('modal-content');
    this.backBtn = document.getElementById('back-btn');
    this.closeBtn = document.getElementById('close-btn');

    this.setupEventListeners();
    this.subscribeToState();
  }

  setupEventListeners() {
    this.backBtn?.addEventListener('click', () => dialogo.back());
    this.closeBtn?.addEventListener('click', () => dialogo.close());
  }

  subscribeToState() {
    dialogo.subscribe((state) => {
      if (state.isOpen) {
        this.modalElement.style.display = 'flex';

        // Handle different content types
        if (typeof state.activeView.element === 'string') {
          this.content.innerHTML = state.activeView.element;
        } else if (state.activeView.element instanceof Element) {
          this.content.innerHTML = '';
          this.content.appendChild(state.activeView.element);
        } else {
          // Handle any other content type
          this.content.innerHTML = String(state.activeView.element || '');
        }

        this.backBtn.style.display = state.hasHistory ? 'block' : 'none';
      } else {
        this.modalElement.style.display = 'none';
      }
    });
  }
}

// Usage
const modalManager = new ModalManager();

// Open multi-step form with HTML strings
document.getElementById('start-form').addEventListener('click', () => {
  dialogo.open(`
    <div>
      <h2>Step 1: Personal Info</h2>
      <input placeholder="Name" />
      <button onclick="dialogo.navigate(`
        <div>
          <h2>Step 2: Contact</h2>
          <input placeholder="Email" />
          <button onclick="dialogo.back()">Back</button>
          <button onclick="dialogo.close()">Submit</button>
        </div>
      `)">Next</button>
    </div>
  `);
});
```

#### With Next.js

```tsx
// app/components/Modal.tsx
'use client';

import { useEffect, useState } from 'react';
import Dialogo from 'dialogo';

const dialogo = new Dialogo();

export default function Modal() {
  const [state, setState] = useState(null);

  useEffect(() => {
    return dialogo.subscribe(setState);
  }, []);

  if (!state?.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        {state.activeView.element}
        {state.hasHistory && <button onClick={() => dialogo.back()}>Back</button>}
        <button onClick={() => dialogo.close()}>Close</button>
      </div>
    </div>
  );
}
```

#### With Tailwind CSS

```tsx
import Dialogo from 'dialogo';

const dialogo = new Dialogo();

function StyledModal() {
  const [state, setState] = useState(null);

  useEffect(() => {
    return dialogo.subscribe(setState);
  }, []);

  if (!state?.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="mt-3 text-center sm:mt-0 sm:text-left">{state.activeView.element}</div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              onClick={() => dialogo.close()}
            >
              Close
            </button>
            {state.hasHistory && (
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => dialogo.back()}
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Edoardo Guido](https://edoardoguido.com/)

## 🆘 Support

- 📧 Email: ciao@edoardoguido.com
- 🐛 Issues: [GitHub Issues](https://github.com/edoguido/dialogo/issues)
- 📖 Documentation: [Website](https://edoardoguido.com/)

---

**Made with ❤️ by [Edoardo Guido](https://edoardoguido.com/)**
