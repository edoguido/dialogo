import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/integration/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@modalogue/core': path.resolve(__dirname, 'packages/core/src/index.ts'),
    },
  },
});
