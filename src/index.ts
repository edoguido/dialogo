/**
 * Framework-agnostic content type for modal content.
 * Supports:
 * - DOM Elements (vanilla JS)
 * - Strings (HTML content)
 * - Framework objects (React elements, Vue components, etc.)
 */
type ModalContent = Element | string | object

/**
 * Modal state interface that works across all frameworks.
 * The element property can contain any content.
 */
export type ModalState = {
  isOpen: boolean;
  activeView: { element: ModalContent; id: number } | null;
  hasHistory: boolean;
};


type Subscriber = (state: ModalState) => void;

class Observer {
  private static instance: Observer;

  // the entity that is receiving updates
  // not sure but should only be out Dialogo component for now
  private subscribers: Set<Subscriber> = new Set();

  // state for the modal rendering
  private isOpen: boolean = false;
  private viewHistory: Array<ModalState['activeView']> = [];
  // activeView is derived from viewHistory

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

  private getActiveView = (): ModalState['activeView'] => {
    return this.viewHistory[this.viewHistory.length - 1] || null;
  };

  /**
   * Opens a modal with the specified content.
   * @param content - Framework-agnostic content (DOM Element, string, React element, Vue component, etc.)
   */
  public open = (content: ModalContent): void => {
    // reset the history with new content
    // -- we probably want to instead open another modal in this case
    this.viewHistory = [{ id: this.viewHistory.length, element: content }];
    this.isOpen = true;
    this.notify();
  };

  /**
   * Navigates to a new step in the modal with the specified content.
   * @param content - Framework-agnostic content (DOM Element, string, React element, Vue component, etc.)
   */
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

// don't like this -- probably can be improved
const modal = Observer.getInstance();
export default modal;
