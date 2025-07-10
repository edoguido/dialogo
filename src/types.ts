// Framework-agnostic content type - generic for maximum flexibility
export type ModalContent<T = any> = T;

// Active view interface
export type ActiveView = {
  element: ModalContent | null;
  id: number | null;
};

// Modal state interface
export type ModalState = {
  isOpen: boolean;
  activeView: ActiveView;
  hasHistory: boolean;
};

// Subscriber function type
export type Subscriber = (state: ModalState) => void;

// Modal API interface
export interface ModalAPI {
  open: (content: ModalContent) => void;
  navigate: (content: ModalContent) => void;
  back: () => void;
  close: () => void;
  hide: () => void;
  show: () => void;
  subscribe: (callback: Subscriber) => () => void;
}

