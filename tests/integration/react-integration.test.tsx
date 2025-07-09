import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import modal from '../../src/index';
import type { ModalState } from '../../src/index';

// Mock React component for testing
const TestModal = () => {
  const [state, setState] = React.useState<ModalState>({
    isOpen: false,
    activeView: null,
    hasHistory: false,
  });

  React.useEffect(() => {
    const unsubscribe = modal.subscribe(setState);
    return unsubscribe;
  }, []);

  const handleOpen = () => {
    const content = document.createElement('div');
    content.innerHTML = '<h1>Test Modal</h1>';
    modal.open(content);
  };

  const handleClose = () => {
    modal.close();
  };

  const handleNavigate = () => {
    const content = document.createElement('div');
    content.innerHTML = '<h2>Step 2</h2>';
    modal.navigate(content);
  };

  const handleBack = () => {
    modal.back();
  };

  return (
    <div>
      <button data-testid="open-modal" onClick={handleOpen}>
        Open Modal
      </button>
      <button data-testid="close-modal" onClick={handleClose}>
        Close Modal
      </button>
      <button data-testid="navigate-modal" onClick={handleNavigate}>
        Next Step
      </button>
      <button data-testid="back-modal" onClick={handleBack}>
        Back
      </button>

      {state.isOpen && (
        <div data-testid="modal" role="dialog">
          <div data-testid="modal-content">
            {state.activeView?.element && (
              <div
                ref={(node) => {
                  if (node && state.activeView?.element instanceof Element) {
                    node.innerHTML = '';
                    node.appendChild(state.activeView.element.cloneNode(true));
                  }
                }}
              />
            )}
          </div>
          <div data-testid="modal-state">
            {JSON.stringify({
              isOpen: state.isOpen,
              hasHistory: state.hasHistory,
              activeId: state.activeView?.id,
            })}
          </div>
        </div>
      )}
    </div>
  );
};

describe('React Integration Tests', () => {
  beforeEach(() => {
    modal.close();
  });

  it('should render modal when opened', () => {
    render(<TestModal />);

    fireEvent.click(screen.getByTestId('open-modal'));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('should hide modal when closed', () => {
    render(<TestModal />);

    fireEvent.click(screen.getByTestId('open-modal'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close-modal'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should navigate to next step', () => {
    render(<TestModal />);

    fireEvent.click(screen.getByTestId('open-modal'));
    fireEvent.click(screen.getByTestId('navigate-modal'));

    const stateElement = screen.getByTestId('modal-state');
    const state = JSON.parse(stateElement.textContent || '{}');

    expect(state.hasHistory).toBe(true);
    expect(state.activeId).toBe(1);
  });

  it('should go back to previous step', () => {
    render(<TestModal />);

    fireEvent.click(screen.getByTestId('open-modal'));
    fireEvent.click(screen.getByTestId('navigate-modal'));
    fireEvent.click(screen.getByTestId('back-modal'));

    const stateElement = screen.getByTestId('modal-state');
    const state = JSON.parse(stateElement.textContent || '{}');

    expect(state.hasHistory).toBe(false);
    expect(state.activeId).toBe(0);
  });

  it('should close modal when going back from first step', () => {
    render(<TestModal />);

    fireEvent.click(screen.getByTestId('open-modal'));
    fireEvent.click(screen.getByTestId('back-modal'));

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should maintain state across re-renders', () => {
    const { rerender } = render(<TestModal />);

    fireEvent.click(screen.getByTestId('open-modal'));
    fireEvent.click(screen.getByTestId('navigate-modal'));

    // Re-render component
    rerender(<TestModal />);

    const stateElement = screen.getByTestId('modal-state');
    const state = JSON.parse(stateElement.textContent || '{}');

    expect(state.isOpen).toBe(true);
    expect(state.hasHistory).toBe(true);
    expect(state.activeId).toBe(1);
  });

  it('should handle framework-agnostic content types', () => {
    render(<TestModal />);

    // Test that the modal can handle different content types
    // This is tested through the ref-based rendering in the component
    fireEvent.click(screen.getByTestId('open-modal'));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });
});
