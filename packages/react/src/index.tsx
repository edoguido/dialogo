'use client';

import { AnimatePresence, type AnimatePresenceProps, motion, type Variants } from 'motion/react';
import type { ModalAPI, ModalState } from '@modalogue/core';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';

export type ModalProps = {
  modalogue: ModalAPI;
  modalVariants?: Variants;
  viewVariants?: Variants;
  viewTransitionMode?: AnimatePresenceProps['mode'];
};

type ModalogueContextT = {
  modalogue: ModalAPI;
  isOpen: boolean;
  activeView: ModalState['activeView'];
  modalRef: React.RefObject<HTMLDivElement | null>;
  boundsRef: ReturnType<typeof useMeasure>[0];
  bounds: ReturnType<typeof useMeasure>[1];
  modalVariants: Variants;
  modalVariantsAnimateResolver: Variants['animate'];
  viewVariants: Variants;
  viewTransitionMode: AnimatePresenceProps['mode'];
};

const ModalogueContext = createContext<ModalogueContextT | null>(null);

const MODALOGUE_INITIAL_STATE: ModalState = {
  isOpen: false,
  activeView: { id: null, element: null },
  hasHistory: false,
};

const OVERLAY_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const MODAL_VARIANTS: Variants = {
  initial: {
    opacity: 0,
    y: '2%',
    scale: 0.9,
    rotateY: '-20deg',
    rotateX: '-6deg',
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: '0%',
    scale: 1,
    rotateY: '0deg',
    rotateX: '0deg',
    filter: 'blur(0px)',
    transition: {
      type: 'tween',
      ease: [0.2, 0, 0, 0.8],
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: '2%',
    scale: 0.9,
    rotateY: '26deg',
    rotateX: '12deg',
    filter: 'blur(12px)',
    transition: { type: 'tween', ease: [0.3, 0, 0, 0.6], duration: 0.3 },
  },
};

const VIEW_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const CONTENT_VARIANTS: Variants = {
  initial: () => ({
    opacity: 0,
    transition: { type: 'tween', ease: [0.8, 0, 0, 0.8], duration: 0.4 },
  }),
  animate: {
    opacity: 1,
    transition: {
      type: 'tween',
      ease: [0.8, 0, 0, 0.8],
      duration: 0.4,
    },
  },
  exit: () => ({
    opacity: 0,
    transition: { type: 'tween', ease: [0.8, 0, 0, 0.8], duration: 0.4 },
  }),
};

const useModalogueContext = () => {
  const context = useContext(ModalogueContext);
  if (!context) {
    throw new Error('Modalogue compound components must be used within Modalogue.Root.');
  }
  return context;
};

export const useModal = (modalogue: ModalAPI) => {
  const [state, setState] = useState<ModalState>(MODALOGUE_INITIAL_STATE);

  useEffect(() => {
    const unsubscribe = modalogue.subscribe(setState);
    return unsubscribe;
  }, [modalogue]);

  return state;
};

type RootProps = ModalProps & {
  children?: unknown;
};

type ContainerProps = {
  children?: unknown;
};

type OverlayProps = {
  closeOnClick?: boolean;
};

type ModalShellProps = {
  children?: unknown;
};

type ViewProps = {
  children?: unknown | ((activeView: ModalState['activeView']) => unknown);
};

function Root(props: RootProps) {
  const {
    modalogue,
    modalVariants = MODAL_VARIANTS,
    viewVariants = VIEW_VARIANTS,
    viewTransitionMode = 'popLayout',
    children,
  } = props;

  const { isOpen, activeView } = useModal(modalogue);
  const modalRef = useRef<HTMLDivElement>(null);
  const [boundsRef, bounds] = useMeasure({ offsetSize: true });

  const modalVariantsAnimateResolver = useMemo(() => {
    const modalVariantsAnimateType = typeof modalVariants.animate;

    return modalVariantsAnimateType === 'object'
      ? (dimensions: { width: number; height: number }) => ({
          ...modalVariants.animate,
          width: dimensions.width,
          height: dimensions.height,
        })
      : modalVariants.animate;
  }, [modalVariants.animate]);

  useEffect(() => {
    const closeOnEscapeKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'escape') {
        modalogue.close();
      }
    };

    window.addEventListener('keyup', closeOnEscapeKey);
    return () => {
      window.removeEventListener('keyup', closeOnEscapeKey);
    };
  }, [modalogue]);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen, activeView.id]);

  const context = useMemo<ModalogueContextT>(
    () => ({
      modalogue,
      isOpen,
      activeView,
      modalRef,
      boundsRef,
      bounds,
      modalVariants,
      modalVariantsAnimateResolver,
      viewVariants,
      viewTransitionMode,
    }),
    [
      modalogue,
      isOpen,
      activeView,
      boundsRef,
      bounds,
      modalVariants,
      modalVariantsAnimateResolver,
      viewVariants,
      viewTransitionMode,
    ]
  );

  return <ModalogueContext.Provider value={context}>{children as React.ReactNode}</ModalogueContext.Provider>;
}

function Container(props: ContainerProps) {
  const { isOpen } = useModalogueContext();

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div data-modalogue-container="" initial="initial" animate="animate" exit="exit" data-testid="modal">
          {props.children as never}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Overlay(props: OverlayProps) {
  const { modalogue } = useModalogueContext();
  const { closeOnClick = true } = props;

  return (
    <motion.div
      data-modalogue-overlay=""
      data-testid="modal-backdrop"
      onClick={() => {
        if (closeOnClick) {
          modalogue.close();
        }
      }}
      variants={OVERLAY_VARIANTS}
    />
  );
}

function ModalShell(props: ModalShellProps) {
  const { modalRef, bounds, modalVariants, modalVariantsAnimateResolver } = useModalogueContext();

  return (
    <motion.div
      data-modalogue-modal=""
      tabIndex={0}
      ref={modalRef as React.Ref<HTMLDivElement>}
      custom={bounds}
      variants={{
        initial: { ...modalVariants.initial },
        animate: modalVariantsAnimateResolver,
        exit: { ...modalVariants.exit },
      }}
    >
      {props.children as never}
    </motion.div>
  );
}

function View(props: ViewProps) {
  const { boundsRef, viewVariants, viewTransitionMode, activeView } = useModalogueContext();

  const content =
    typeof props.children === 'function' ? props.children(activeView) : (props.children ?? <>{activeView.element}</>);

  return (
    <motion.div data-modalogue-view ref={boundsRef} variants={viewVariants} data-testid="modal-content">
      <AnimatePresence initial={false} mode={viewTransitionMode}>
        <motion.div key={activeView.id} initial="initial" animate="animate" exit="exit" variants={CONTENT_VARIANTS}>
          {content as never}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function Modal(props: ModalProps) {
  return (
    <Root {...props}>
      <Container>
        <Overlay />
        <ModalShell>
          <View />
        </ModalShell>
      </Container>
    </Root>
  );
}

export const Modalogue = {
  Root,
  Container,
  Overlay,
  Modal: ModalShell,
  View,
};

export default Modal;
