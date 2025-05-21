'use client';

import Dialogo from 'dialogo';
import modal from 'dialogo/state';

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
      <Dialogo />
    </div>
  );
}

const FirstModalView = () => {
  return (
    <div className="p-4 w-[480px] h-[480px]">
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
    <div className="p-4 w-[480px] h-[520px]">
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
