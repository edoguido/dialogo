import type { ModalContent, ActiveView, ModalState, Subscriber, ModalAPI } from './types';

// Re-export types for framework-specific usage
export type { ModalContent, ActiveView, ModalState, Subscriber, ModalAPI };

class Modalogue {
  private subscribers: Set<Subscriber> = new Set();
  private isOpen: boolean = false;
  private viewHistory: Array<ActiveView> = [];

  public constructor() {
    // if (!Modalogue.instance) {
    //   Modalogue.instance = new Modalogue();
    // }
  }

  /**
   * Subscribes to modal state updates.
   *
   * Returns an unsubscribe function that removes the callback.
   */
  public subscribe = (callback: Subscriber): (() => void) => {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  };

  private notify = (): void => {
    const state: ModalState = {
      isOpen: this.isOpen,
      activeView: this.getActiveView(),
      hasHistory: this.viewHistory.length > 1,
    };

    this.subscribers.forEach((subscriber) => subscriber(state));
  };

  /**
   * Returns the current active view or an empty view when history is empty.
   */
  private getActiveView = (): ActiveView => {
    return this.viewHistory[this.viewHistory.length - 1] || { id: null, element: null };
  };

  /**
   * Opens the modal and resets history to a single initial view (`id: 0`).
   */
  public open = (content: ModalContent): void => {
    this.viewHistory = [{ id: 0, element: content }];
    this.isOpen = true;
    this.notify();
  };

  /**
   * Navigates forward by pushing a new view onto history.
   */
  public navigate = (content: ModalContent): void => {
    this.viewHistory.push({ id: this.viewHistory.length, element: content });
    this.notify();
  };

  /**
   * Navigates backward one step.
   *
   * If there is only one view in history, this closes the modal.
   */
  public back = (): void => {
    if (this.viewHistory.length > 1) {
      this.viewHistory.pop();
      this.notify();
    } else {
      this.close();
    }
  };

  /**
   * Closes the modal and clears view history.
   */
  public close = (): void => {
    this.isOpen = false;
    this.viewHistory = [];
    this.notify();
  };

  /**
   * Hides the modal without clearing view history.
   */
  public hide = (): void => {
    this.isOpen = false;
    this.notify();
  };

  /**
   * Shows the modal while preserving the existing view history.
   */
  public show = (): void => {
    this.isOpen = true;
    this.notify();
  };
}

export default Modalogue;
