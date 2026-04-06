import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import Modalogue from '../../src/index';

describe('Modalogue Modal Engine', () => {
  let modalogue: Modalogue;
  let mockSubscriber: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Create fresh instance for each test
    modalogue = new Modalogue();
    mockSubscriber = vi.fn();
  });

  describe('Framework Agnostic Content Support', () => {
    it('should accept DOM elements', () => {
      const content = document.createElement('div');
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });

    it('should accept string content', () => {
      const content = '<div>Hello World</div>';
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });

    it('should accept framework objects', () => {
      const content = { type: 'div', props: { children: 'Framework Component' } };
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });
  });

  describe('Opening Modal', () => {
    it('should open modal with content', () => {
      const content = document.createElement('div');
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content);

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });

    it('should open modal with string content', () => {
      const content = 'Hello World';
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content);

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
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      // Open first modal and navigate
      modalogue.open(content1);
      modalogue.navigate(content2);

      // Clear mock calls
      mockSubscriber.mockClear();

      // Open new modal
      const content3 = document.createElement('p');
      modalogue.open(content3);

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
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content1);
      mockSubscriber.mockClear();

      modalogue.navigate(content2);

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
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content1);
      modalogue.navigate(content2);
      modalogue.navigate(content3);

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
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content1);
      modalogue.navigate(content2);
      mockSubscriber.mockClear();

      modalogue.back();

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: true,
        activeView: { element: content1, id: 0 },
        hasHistory: false,
      });

      unsubscribe();
    });

    it('should close modal when going back from first view', () => {
      const content = document.createElement('div');
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content);
      mockSubscriber.mockClear();

      modalogue.back();

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: false,
        activeView: { id: null, element: null },
        hasHistory: false,
      });

      unsubscribe();
    });
  });

  describe('Closing Modal', () => {
    it('should close modal and clear history', () => {
      const content1 = document.createElement('div');
      const content2 = document.createElement('span');
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content1);
      modalogue.navigate(content2);
      mockSubscriber.mockClear();

      modalogue.close();

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: false,
        activeView: { id: null, element: null },
        hasHistory: false,
      });

      unsubscribe();
    });
  });

  describe('Show/Hide', () => {
    it('should hide modal without clearing history', () => {
      const content1 = document.createElement('div');
      const content2 = document.createElement('span');
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content1);
      modalogue.navigate(content2);
      mockSubscriber.mockClear();

      modalogue.hide();

      expect(mockSubscriber).toHaveBeenCalledWith({
        isOpen: false,
        activeView: { element: content2, id: 1 },
        hasHistory: true,
      });

      unsubscribe();
    });

    it('should show hidden modal', () => {
      const content = document.createElement('div');
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      modalogue.open(content);
      modalogue.hide();
      mockSubscriber.mockClear();

      modalogue.show();

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

      const unsubscribe1 = modalogue.subscribe(subscriber1);
      const unsubscribe2 = modalogue.subscribe(subscriber2);

      modalogue.open(content);

      expect(subscriber1).toHaveBeenCalled();
      expect(subscriber2).toHaveBeenCalled();

      unsubscribe1();
      unsubscribe2();
    });

    it('should allow unsubscribing', () => {
      const subscriber = vi.fn();
      const content = document.createElement('div');

      const unsubscribe = modalogue.subscribe(subscriber);
      unsubscribe();

      modalogue.open(content);

      // Should not be called after unsubscribing
      expect(subscriber).toHaveBeenCalledTimes(0);
    });
  });

  describe('State Consistency', () => {
    it('should maintain consistent state across operations', () => {
      const content1 = document.createElement('div');
      const content2 = document.createElement('span');
      const unsubscribe = modalogue.subscribe(mockSubscriber);

      // Open modal
      modalogue.open(content1);
      expect(mockSubscriber).toHaveBeenLastCalledWith({
        isOpen: true,
        activeView: { element: content1, id: 0 },
        hasHistory: false,
      });

      // Navigate
      modalogue.navigate(content2);
      expect(mockSubscriber).toHaveBeenLastCalledWith({
        isOpen: true,
        activeView: { element: content2, id: 1 },
        hasHistory: true,
      });

      // Go back
      modalogue.back();
      expect(mockSubscriber).toHaveBeenLastCalledWith({
        isOpen: true,
        activeView: { element: content1, id: 0 },
        hasHistory: false,
      });

      // Close
      modalogue.close();
      expect(mockSubscriber).toHaveBeenLastCalledWith({
        isOpen: false,
        activeView: { id: null, element: null },
        hasHistory: false,
      });

      unsubscribe();
    });
  });
});
