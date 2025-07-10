# Framework Compatibility Guide

This library is designed to work seamlessly with React, Vue, Svelte, and vanilla JavaScript. The generic `ModalContent<T = any>` type ensures no TypeScript conflicts while accepting any content type.

## Usage Patterns

### Vanilla JavaScript / TypeScript

```typescript
import Dialogo from 'dialogo';
const dialogo = new Dialogo();

// DOM Element
const element = document.createElement('div');
element.innerHTML = '<h1>Hello World</h1>';
dialogo.open(element);

// String content
dialogo.open('<h1>Hello World</h1>');

// Any other content type
dialogo.open(anyContent);
```

### React

```typescript
import Dialogo from 'dialogo';
const dialogo = new Dialogo();

// React elements
const MyComponent = () => <div>Hello World</div>;
dialogo.open(<MyComponent />);

// React nodes
dialogo.open(<h1>Hello World</h1>);

// Any other content type
dialogo.open(anyContent);
```

### Vue

```typescript
import Dialogo from 'dialogo';
const dialogo = new Dialogo();

// Vue components
const MyComponent = {
  template: '<div>Hello World</div>',
};
dialogo.open(MyComponent);

// Vue VNodes
dialogo.open(h('div', 'Hello World'));

// Any other content type
dialogo.open(anyContent);
```

### Svelte

```typescript
import Dialogo from 'dialogo';
const dialogo = new Dialogo();

// Svelte components
const MyComponent = {
  $$render: () => '<div>Hello World</div>',
};
dialogo.open(MyComponent);

// Any other content type
dialogo.open(anyContent);
```

## Type Safety

The library uses a generic `ModalContent<T = any>` type that accepts any content type without TypeScript complaints. This ensures:

1. **No Type Conflicts**: Works with any framework without type errors
2. **Flexible Content**: Accepts React elements, Vue components, HTML strings, DOM elements, or any framework objects
3. **Simple API**: Just `import modal from 'dialogo'` works for all frameworks

## Content Handling

Since the library is framework-agnostic, you handle content rendering based on your framework:

```typescript
// React - render directly
{state.activeView.element}

// Vue - use component
<component :is="state.activeView.element" />

// Svelte - use @html or component
{@html state.activeView.element}

// Vanilla JS - handle different types
if (typeof content === 'string') {
  element.innerHTML = content;
} else if (content instanceof Element) {
  element.appendChild(content);
} else {
  element.innerHTML = String(content);
}
```

## Framework Integration Examples

### React Integration

```tsx
import React, { useEffect, useState } from 'react';
import Dialogo from 'dialogo';
const dialogo = new Dialogo();

const ModalProvider: React.FC = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    return dialogo.subscribe(setState);
  }, []);

  if (!state?.isOpen) return null;

  return <div className="modal">{state.activeView.element}</div>;
};
```

### Vue Integration

```vue
<template>
  <div v-if="state.isOpen" class="modal">
    <component :is="state.activeView.element" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Dialogo from 'dialogo';
const dialogo = new Dialogo();

const state = ref(null);

let unsubscribe: (() => void) | undefined;

onMounted(() => {
  unsubscribe = dialogo.subscribe((newState) => {
    state.value = newState;
  });
});

onUnmounted(() => {
  unsubscribe?.();
});
</script>
```

### Svelte Integration

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import Dialogo from 'dialogo';
  const dialogo = new Dialogo();

  let state = null;

  let unsubscribe: (() => void) | undefined;

  onMount(() => {
    unsubscribe = dialogo.subscribe((newState) => {
      state = newState;
    });
  });

  onDestroy(() => {
    unsubscribe?.();
  });
</script>

{#if state?.isOpen}
  <div class="modal">
    {#if state.activeView.element}
      {@html state.activeView.element}
    {/if}
  </div>
{/if}
```

## Simple API

The library provides a single, simple API that works with all frameworks:

```json
{
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.mts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      }
    }
  }
}
```

Just `import modal from 'dialogo'` and you're ready to go with any framework!
