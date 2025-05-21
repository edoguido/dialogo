'use client';

import { motion, AnimatePresence, Variants } from 'motion/react';
import useMeasure from 'react-use-measure';

import React, { useEffect, useRef, useState } from 'react';
import modal, { ModalState } from './state';

import './style.css';

const INITIAL_STATE: ModalState = {
  isOpen: false,
  activeView: null,
  hasHistory: false,
};

/**
 *
 * we start by using Motion (formerly framer motion) for enter and
 * exit animations, but I'm aiming at getting rid of them in the future
 */

// The props of this component could dictate the type of animation,
// and if to fade between views for example
function Dialogo() {
  const { isOpen, activeView } = useDialogo();
  const lastActiveViewRef = useRef<number>();
  const [elementRef, bounds] = useMeasure({ offsetSize: true });

  useEffect(() => {
    if (!activeView) return;
    lastActiveViewRef.current = activeView.id;
  }, [activeView?.id]);

  useEffect(() => {
    window.addEventListener('keyup', closeOnEscapeKey);

    return () => {
      window.removeEventListener('keyup', closeOnEscapeKey);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div data-dialogo-container="" initial="hidden" animate="visible" exit="hidden">
          <motion.div
            data-dialogo-overlay=""
            onClick={() => {
              modal.close();
            }}
            variants={OVERLAY_VARIANTS}
          />
          <motion.div data-dialogo-modal="" custom={bounds} variants={MODAL_VARIANTS}>
            <motion.div data-dialogo-view-content ref={elementRef} variants={CONTENT_VARIANTS}>
              <AnimatePresence initial={false} mode="popLayout" custom={activeView.id > lastActiveViewRef.current}>
                <motion.div
                  key={activeView.id}
                  custom={activeView.id > lastActiveViewRef.current}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={{
                    initial: (forward) => ({
                      opacity: 0,
                      x: forward ? '20%' : '-20%',
                      transition: { type: 'ease', ease: [0.8, 0, 0, 0.8], duration: 0.4 },
                    }),
                    animate: {
                      opacity: 1,
                      x: '-0%',
                      transition: {
                        type: 'ease',
                        ease: [0.8, 0, 0, 0.8],
                        duration: 0.4,
                      },
                    },
                    exit: (forward) => ({
                      opacity: 0,
                      x: forward ? '-20%' : '20%',
                      transition: { type: 'ease', ease: [0.8, 0, 0, 0.8], duration: 0.4 },
                    }),
                  }}
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
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MODAL_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: '2%',
    scale: 0.9,
    rotateY: '20deg',
    rotateX: '6deg',
    filter: 'blur(6px)',
    transition: { type: 'ease', ease: [0.3, 0, 0, 0.6], duration: 0.3 },
  },
  visible: (bounds) => ({
    width: bounds.width,
    height: bounds.height,
    opacity: 1,
    y: '0%',
    scale: 1,
    rotateY: '0deg',
    rotateX: '0deg',
    filter: 'blur(0px)',
    transition: {
      type: 'ease',
      ease: [0.2, 0, 0, 0.6],
      duration: 0.3,
      width: { type: 'ease', ease: [0.5, 0.1, 0.1, 0.9], duration: 0.4 },
      height: { type: 'ease', ease: [0.5, 0.1, 0.1, 0.9], duration: 0.4 },
    },
  }),
};

const CONTENT_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const useDialogo = () => {
  const [state, setState] = useState<ModalState>(INITIAL_STATE);

  React.useEffect(() => {
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

export default Dialogo;
