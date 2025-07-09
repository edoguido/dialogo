// Test setup file for Vitest
// This file runs before each test file

import '@testing-library/jest-dom';

// Mock DOM APIs that might not be available in jsdom
if (typeof window !== 'undefined') {
  // Ensure document is available
  if (!document) {
    throw new Error('Document not available in test environment');
  }
} 