"use client";

import { AnimatePresence, motion } from "motion/react";

import Dialogo from "dialogo";
import modal from "dialogo/state";

export default function Home() {
	return (
		<AnimatePresence mode="popLayout">
			<motion.div
				initial="initial"
				animate="animate"
				exit="exit"
				className="flex items-start justify-center min-h-screen font-[family-name:var(--font-geist-sans)]"
			>
				<button
					type="button"
					className="block bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
					onClick={() => {
						modal.open(<FirstModalView />);
					}}
				>
					Open modal
				</button>
				<Dialogo />
			</motion.div>
		</AnimatePresence>
	);
}

const FirstModalView = () => {
	return (
		<motion.div key="1" className="p-4 w-[480px] h-[480px]">
			<motion.div>Ciaone</motion.div>
			<motion.button
				className="bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
				onClick={() => {
					modal.navigate(<SecondModalView />);
				}}
			>
				Go to second
			</motion.button>
		</motion.div>
	);
};

const SecondModalView = () => {
	return (
		<motion.div
			key="2"
			className="p-4 w-[480px] h-[480px]"
			variants={{
				initial: { y: "20%" },
				animate: { y: "0%" },
				exit: { y: "20%" },
			}}
		>
			<motion.div key="label">Ciaone</motion.div>
			<motion.button
				key="button"
				className="bg-white text-black px-2 py-0.5 cursor-pointer rounded-lg"
				onClick={() => {
					modal.back();
				}}
			>
				Go back
			</motion.button>
			<motion.button
				key="button2"
				className="bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
				onClick={() => {
					modal.navigate(<ThirdModalView />);
				}}
			>
				Go to third
			</motion.button>
		</motion.div>
	);
};

const ThirdModalView = () => {
	return (
		<motion.div key="3" className="p-4 w-[480px] h-[520px]">
			<motion.div>Third view</motion.div>
			<motion.button
				className="bg-black text-white px-2 py-0.5 cursor-pointer rounded-lg"
				onClick={() => {
					modal.back();
				}}
			>
				Go back
			</motion.button>
		</motion.div>
	);
};
