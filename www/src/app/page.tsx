'use client';

import { motion } from 'motion/react';
import Modal from '@modalogue/react';
import { modalogue } from './modalogue-instance';
import './modalogue.css';

// const MODAL_VARIANTS: Variants = {
//   initial: {
//     opacity: 'var(--opacity-from)',
//     scale: 'var(--scale-from)',
//     y: 'var(--y-from)',
//     filter: 'blur(6px)',
//     transition: { type: 'tween', ease: [1, 0, 0, 0], duration: 0.3 },
//   },
//   animate: {
//     opacity: 'var(--opacity-to)',
//     scale: 'var(--scale-to)',
//     y: 'var(--y-to)',
//     filter: 'blur(0px)',
//     transition: { type: 'tween', ease: [0.6, 0, 0, 0.8], duration: 0.3 },
//   },
//   exit: {
//     opacity: 'var(--opacity-from)',
//     scale: 'var(--scale-from)',
//     y: 'var(--y-from)',
//     filter: 'blur(6px)',
//     transition: { type: 'tween', ease: [0.3, 0, 0, 0.2], duration: 0.3 },
//   },
// };

export default function Home() {
  return (
    <div className="flex items-start justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <button
        data-testid="open-modal"
        className="block bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modalogue.open(<FirstModalView />);
        }}
      >
        Open modal
      </button>
      <button
        data-testid="hide-modal"
        className="block bg-white text-black px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modalogue.hide();
        }}
      >
        Hide modal
      </button>
      <button
        data-testid="show-modal"
        className="block bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modalogue.show();
        }}
      >
        Show modal
      </button>
      <Modal modalogue={modalogue} viewTransitionMode="popLayout" /* modalVariants={MODAL_VARIANTS} */ />
    </div>
  );
}

const FirstModalView = () => {
  return (
    <div className="p-4 w-[480px] h-[380px]" data-testid="step-1">
      <div>Ciaone</div>
      <button
        data-testid="close-modal"
        className="bg-white text-black px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modalogue.close();
        }}
      >
        Close
      </button>
      <button
        data-testid="next-step"
        className="bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modalogue.navigate(<SecondModalView />);
        }}
      >
        Go to second
      </button>
    </div>
  );
};

const SecondModalView = () => {
  return (
    <div className="p-4 w-[480px] h-[520px]" data-testid="step-2">
      <PermanentElement activeStep={1} />
      <div>Second view</div>
      <button
        data-testid="hide-modal"
        className="bg-white text-black px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modalogue.hide();
        }}
      >
        Hide modal
      </button>
      <button
        data-testid="back-step"
        className="bg-white text-black px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modalogue.back();
        }}
      >
        Go back
      </button>
      <button
        data-testid="next-step"
        className="bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modalogue.navigate(<ThirdModalView />);
        }}
      >
        Go to third
      </button>
    </div>
  );
};

const ThirdModalView = () => {
  return (
    <div className="p-4 w-[420px] h-[420px]" data-testid="step-3">
      <PermanentElement activeStep={2} />
      <div>Third view</div>
      <button
        data-testid="back-step"
        className="bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modalogue.back();
        }}
      >
        Go back
      </button>
    </div>
  );
};

const PermanentElement = ({ activeStep = 0 }) => {
  return (
    <motion.div layoutId="permanent" className="flex gap-8 items-baseline">
      {STEPS.map((step, i) => (
        <motion.div key={i} style={{ opacity: step === activeStep ? 1 : 0.5 }}>
          Step <motion.span>{step}</motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
};

const STEPS = [1, 2, 3];
