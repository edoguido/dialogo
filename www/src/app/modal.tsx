'use client';

import { motion, AnimatePresence, Variants, AnimatePresenceProps } from 'motion/react';
import useMeasure from 'react-use-measure';

import React, { useEffect, useState } from 'react';
import modal, { type ModalState } from 'dialogo';

import './style.css';

type ModalT = {
  modalVariants?: Variants;
  viewVariants?: Variants;
  viewTransitionMode?: AnimatePresenceProps['mode'];
};

/**
 *
 * we start by using Motion (formerly framer motion) for enter and
 * exit animations, but I'm aiming at getting rid of them in the future
 */

function Modal(props: ModalT) {
  const { modalVariants = MODAL_VARIANTS, viewVariants = VIEW_VARIANTS, viewTransitionMode = 'popLayout' } = props;

  const { isOpen, activeView } = useModal();
  const [elementRef, bounds] = useMeasure({ offsetSize: true });

  const modalVariantsAnimateType = typeof modalVariants.animate;
  const modalVariantsAnimateResolver =
    modalVariantsAnimateType === 'object'
      ? // if it's an object, we overwrite width and height animation
        // in order to animate them
        (bounds: { width: number; height: number }) => ({
          ...modalVariants.animate,
          width: bounds.width,
          height: bounds.height,
        })
      : // if it's a function, we just return that function
        // but the user will have to specify to animate width and height
        // following bounds object
        modalVariants.animate;

  useEffect(() => {
    window.addEventListener('keyup', closeOnEscapeKey);

    return () => {
      window.removeEventListener('keyup', closeOnEscapeKey);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div data-dialogo-container="" initial="initial" animate="animate" exit="exit">
          <motion.div
            data-dialogo-overlay=""
            onClick={() => {
              modal.close();
            }}
            variants={OVERLAY_VARIANTS}
          />
          <motion.div
            data-dialogo-modal=""
            custom={bounds}
            variants={{
              initial: { ...modalVariants.initial },
              animate: modalVariantsAnimateResolver,
              exit: { ...modalVariants.exit },
            }}
          >
            <motion.div data-dialogo-view ref={elementRef} variants={viewVariants}>
              <AnimatePresence initial={false} mode={viewTransitionMode}>
                <motion.div
                  key={activeView.id}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={CONTENT_VARIANTS}
                >
                  {activeView.element}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
    rotateY: '20deg',
    rotateX: '6deg',
    transition: { type: 'ease', ease: [0.3, 0, 0, 0.6], duration: 0.3 },
  },
  animate: {
    opacity: 1,
    y: '0%',
    scale: 1,
    rotateY: '0deg',
    rotateX: '0deg',
    transition: {
      type: 'ease',
      ease: [0.2, 0, 0, 0.6],
      duration: 0.3,
      width: { type: 'ease', ease: [0.5, 0.1, 0.1, 0.9], duration: 0.4 },
      height: { type: 'ease', ease: [0.5, 0.1, 0.1, 0.9], duration: 0.4 },
    },
  },
  exit: {
    opacity: 0,
    y: '2%',
    scale: 0.9,
    rotateY: '20deg',
    rotateX: '6deg',
    transition: { type: 'ease', ease: [0.3, 0, 0, 0.6], duration: 0.3 },
  },
};

const VIEW_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const CONTENT_VARIANTS: Variants = {
  initial: (forward) => ({
    opacity: 0,
    // x: forward ? '20%' : '-20%',
    transition: { type: 'ease', ease: [0.8, 0, 0, 0.8], duration: 0.4 },
  }),
  animate: {
    opacity: 1,
    // x: '-0%',
    transition: {
      type: 'ease',
      ease: [0.8, 0, 0, 0.8],
      duration: 0.4,
    },
  },
  exit: (forward) => ({
    opacity: 0,
    // x: forward ? '-20%' : '20%',
    transition: { type: 'ease', ease: [0.8, 0, 0, 0.8], duration: 0.4 },
  }),
};

const DIALOGO_INITIAL_STATE: ModalState = {
  isOpen: false,
  activeView: null,
  hasHistory: false,
};

export const useModal = () => {
  const [state, setState] = useState<ModalState>(DIALOGO_INITIAL_STATE);

  useEffect(() => {
    const unsubscribe = modal.subscribe(setState);
    return unsubscribe;
  }, []);

  return state;
};

const closeOnEscapeKey = (e) => {
  if (e.key.toLowerCase() === 'escape') {
    modal.close();
  }
};

export default Modal;
