import { describe, it, expect, beforeEach, vi } from 'vitest';
import modal from '../../src/index';

describe('Dialogo Modal Engine', () => {
  let mockSubscriber: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Reset modal state before each test
    modal.close();
    mockSubscriber = vi.fn();
  });

  describe('Framework Agnostic Content Support', () => {
    it('should accept DOM elements', () => {
      const content = document.createElement('div');
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });

    it('should accept string content', () => {
      const content = '<div>Hello World</div>';
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });

    it('should accept framework objects', () => {
      const content = { type: 'div', props: { children: 'Framework Component' } };
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });
  });

  describe('Initial State', () => {
    it('should start with modal closed', () => {
      const unsubscribe = modal.subscribe(mockSubscriber);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: false,
        activeView: null,
        hasHistory: false,
      });

      unsubscribe();
    });
  });

  describe('Opening Modal', () => {
    it('should open modal with content', () => {
      const content = document.createElement('div');
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });

    it('should open modal with string content', () => {
      const content = 'Hello World';
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });

    it('should reset history when opening new modal', () => {
      const content1 = document.createElement('div');
      const content2 = document.createElement('span');
      const unsubscribe = modal.subscribe(mockSubscriber);

      // Open first modal and navigate
      modal.open(content1);
      modal.navigate(content2);

      // Clear mock calls
      mockSubscriber.mockClear();

      // Open new modal
      const content3 = document.createElement('p');
      modal.open(content3);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content3, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });
  });

  describe('Navigation', () => {
    it('should navigate to new content', () => {
      const content1 = document.createElement('div');
      const content2 = document.createElement('span');
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content1);
      mockSubscriber.mockClear();

      modal.navigate(content2);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content2, id: 1 },
        hasHistory: true,
      });

      unsubscribe();
    });

    it('should maintain history during navigation', () => {
      const content1 = document.createElement('div');
      const content2 = document.createElement('span');
      const content3 = document.createElement('p');
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content1);
      modal.navigate(content2);
      modal.navigate(content3);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content3, id: 2 },
        hasHistory: true,
      });

      unsubscribe();
    });
  });

  describe('Back Navigation', () => {
    it('should go back to previous view', () => {
      const content1 = document.createElement('div');
      const content2 = document.createElement('span');
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content1);
      modal.navigate(content2);
      mockSubscriber.mockClear();

      modal.back();

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content1, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });

    it('should close modal when going back from first view', () => {
      const content = document.createElement('div');
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content);
      mockSubscriber.mockClear();

      modal.back();

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: false,
        activeView: null,
        hasHistory: false,
      });

      unsubscribe();
    });

    it('should not go back when no history exists', () => {
      const content = document.createElement('div');
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content);
      mockSubscriber.mockClear();

      modal.back();

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: false,
        activeView: null,
        hasHistory: false,
      });

      unsubscribe();
    });
  });

  describe('Closing Modal', () => {
    it('should close modal and clear history', () => {
      const content1 = document.createElement('div');
      const content2 = document.createElement('span');
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content1);
      modal.navigate(content2);
      mockSubscriber.mockClear();

      modal.close();

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: false,
        activeView: null,
        hasHistory: false,
      });

      unsubscribe();
    });
  });

  describe('Show/Hide', () => {
    it('should hide modal without clearing history', () => {
      const content1 = document.createElement('div');
      const content2 = document.createElement('span');
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content1);
      modal.navigate(content2);
      mockSubscriber.mockClear();

      modal.hide();

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: false,
        activeView: { element: content2, id: 1 },
        hasHistory: true,
      });

      unsubscribe();
    });

    it('should show hidden modal', () => {
      const content = document.createElement('div');
      const unsubscribe = modal.subscribe(mockSubscriber);

      modal.open(content);
      modal.hide();
      mockSubscriber.mockClear();

      modal.show();

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });
  });

  describe('Subscription Management', () => {
    it('should notify multiple subscribers', () => {
      const subscriber1 = vi.fn();
      const subscriber2 = vi.fn();
      const content = document.createElement('div');

      const unsubscribe1 = modal.subscribe(subscriber1);
      const unsubscribe2 = modal.subscribe(subscriber2);

      modal.open(content);

      expect(subscriber1).toHaveBeenCalled();
      expect(subscriber2).toHaveBeenCalled();

      unsubscribe1();
      unsubscribe2();
    });

    it('should allow unsubscribing', () => {
      const subscriber = vi.fn();
      const content = document.createElement('div');

      const unsubscribe = modal.subscribe(subscriber);
      unsubscribe();

      modal.open(content);

      // Should not be called after unsubscribing
      expect(subscriber).toHaveBeenCalledTimes(1); // Only the initial call
    });
  });

  describe('State Consistency', () => {
    it('should maintain consistent state across operations', () => {
      const content1 = document.createElement('div');
      const content2 = document.createElement('span');
      const unsubscribe = modal.subscribe(mockSubscriber);

      // Open modal
      modal.open(content1);
      expect(mockSubscriber).toHaveBeenLastCalledWith({
        isOpen: true,
        activeView: { element: content1, id: 0 },
        hasHistory: false,
      });

      // Navigate
      modal.navigate(content2);
      expect(mockSubscriber).toHaveBeenLastCalledWith({
        isOpen: true,
        activeView: { element: content2, id: 1 },
        hasHistory: true,
      });

      // Go back
      modal.back();
      expect(mockSubscriber).toHaveBeenLastCalledWith({
        isOpen: true,
        activeView: { element: content1, id: 0 },
        hasHistory: false,
      });

      // Close
      modal.close();
      expect(mockSubscriber).toHaveBeenLastCalledWith({
        isOpen: false,
        activeView: null,
        hasHistory: false,
      });

      unsubscribe();
    });
  });
}); 