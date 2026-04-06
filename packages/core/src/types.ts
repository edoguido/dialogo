/**
 * Framework-agnostic modal content.
 *
 * Consumers can pass React nodes, DOM elements, strings, or any framework object.
 */
export type ModalContent<T = any> = T;

/**
 * Active modal view metadata.
 *
 * `id` and `element` are `null` when the modal history is empty.
 */
export type ActiveView = {
  element: ModalContent | null;
  id: number | null;
};

/**
 * Snapshot emitted to subscribers after each state transition.
 */
export type ModalState = {
  isOpen: boolean;
  activeView: ActiveView;
  hasHistory: boolean;
};

/**
 * Listener invoked whenever modal state changes.
 */
export type Subscriber = (state: ModalState) => void;

/**
 * Public Modalogue API contract.
 */
export interface ModalAPI {
  /**
   * Opens a modal with the given content and resets navigation history.
   */
  open: (content: ModalContent) => void;
  /**
   * Pushes a new view onto history and makes it active.
   */
  navigate: (content: ModalContent) => void;
  /**
   * Moves back one view. If there is only one view, it closes the modal.
   */
  back: () => void;
  /**
   * Closes the modal and clears all history.
   */
  close: () => void;
  /**
   * Hides the modal while preserving history and active view.
   */
  hide: () => void;
  /**
   * Shows the modal again using preserved history and active view.
   */
  show: () => void;
  /**
   * Subscribes to state updates. Returns an unsubscribe function.
   */
  subscribe: (callback: Subscriber) => () => void;
}
