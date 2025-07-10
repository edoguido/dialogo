import type { ModalContent, ActiveView, ModalState, Subscriber, ModalAPI } from './types';

// Re-export types for framework-specific usage
export type { ModalContent, ActiveView, ModalState, Subscriber, ModalAPI };

class Observer {
  private static instance: Observer;
  private subscribers: Set<Subscriber> = new Set();
  private isOpen: boolean = false;
  private viewHistory: Array<ActiveView> = [];

  private constructor() { }

  public static getInstance(): Observer {
    if (!Observer.instance) {
      Observer.instance = new Observer();
    }
    return Observer.instance;
  }

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

  private getActiveView = (): ActiveView => {
    return this.viewHistory[this.viewHistory.length - 1] || { id: null, element: null };
  };

  public open = (content: ModalContent): void => {
    this.viewHistory = [{ id: this.viewHistory.length, element: content }];
    this.isOpen = true;
    this.notify();
  };

  public navigate = (content: ModalContent): void => {
    this.viewHistory.push({ id: this.viewHistory.length, element: content });
    this.notify();
  };

  public back = (): void => {
    if (this.viewHistory.length > 1) {
      this.viewHistory.pop();
      this.notify();
    } else {
      this.close();
    }
  };

  public close = (): void => {
    this.isOpen = false;
    this.viewHistory = [];
    this.notify();
  };

  public hide = (): void => {
    this.isOpen = false;
    this.notify();
  };

  public show = (): void => {
    this.isOpen = true;
    this.notify();
  };
}

const dialogo = Observer.getInstance();
export default dialogo;
