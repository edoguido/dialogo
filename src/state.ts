export type ModalState = {
  isOpen: boolean;
  activeView: { element: React.ReactNode | null; id: number };
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

  private constructor() {}

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

  public open = (content: React.ReactNode): void => {
    // reset the history with new content
    // -- we probably want to instead open another modal in this case
    this.viewHistory = [{ id: this.viewHistory.length, element: content }];
    this.isOpen = true;
    this.notify();
  };

  public navigate = (content: React.ReactNode): void => {
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
}

// don't like this -- probably can be improved
const modal = Observer.getInstance();
export default modal;
