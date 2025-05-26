'use client';

import Dialogo from 'dialogo';
import modal from 'dialogo/state';
import { motion, Variants } from 'motion/react';

const MODAL_VARIANTS: Variants = {
  initial: {
    opacity: 'var(--opacity-from)',
    // scale: 'var(--scale-from)',
    y: 'var(--y-from)',
    // filter: 'blur(6px)',
    transition: { type: 'spring', stiffness: 360, damping: 36, mass: 1 },
  },
  animate: {
    opacity: 'var(--opacity-to)',
    scale: 'var(--scale-to)',
    y: 'var(--y-to)',
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 360, damping: 36, mass: 1 },
  },
  exit: {
    opacity: 'var(--opacity-from)',
    scale: 'var(--scale-from)',
    y: 'var(--y-from)',
    filter: 'blur(6px)',
    transition: { type: 'spring', stiffness: 360, damping: 36, mass: 1 },
  },
};

export default function Home() {
  return (
    <div className="flex items-start justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <button
        className="block bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modal.open(<FirstModalView />);
        }}
      >
        Open modal
      </button>
      <Dialogo viewTransitionMode="popLayout" modalVariants={MODAL_VARIANTS} />
    </div>
  );
}

const FirstModalView = () => {
  return (
    <div className="p-4 w-[480px] h-[380px]">
      <div>Ciaone</div>
      <button
        className="bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modal.navigate(<SecondModalView />);
        }}
      >
        Go to second
      </button>
    </div>
  );
};

const SecondModalView = () => {
  return (
    <div className="p-4 w-[480px] h-[520px]">
      <PermanentElement activeStep={1} />
      <div>Second view</div>
      <button
        className="bg-white text-black px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modal.back();
        }}
      >
        Go back
      </button>
      <button
        className="bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modal.navigate(<ThirdModalView />);
        }}
      >
        Go to third
      </button>
    </div>
  );
};

const ThirdModalView = () => {
  return (
    <div className="p-4 w-[420px] h-[420px]">
      <PermanentElement activeStep={2} />
      <div>Third view</div>
      <button
        className="bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
        onClick={() => {
          modal.back();
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
