"use client";

import { AnimatePresence, LazyMotion, type Variants } from "motion/react";
import * as m from "motion/react-m";
import React, { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

import modal, { type ModalState } from "./state";

import "./style.css";

const motionFeatures = () => import("./motionFeatures").then((r) => r.default);

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
	}, [activeView]);

	useEffect(() => {
		window.addEventListener("keyup", handleKeyEvents);

		return () => {
			window.removeEventListener("keyup", handleKeyEvents);
		};
	}, []);

	return (
		<LazyMotion strict features={motionFeatures}>
			<AnimatePresence>
				{isOpen && (
					<m.div
						data-dialogo-container=""
						initial="initial"
						animate="animate"
						exit="exit"
					>
						<m.div
							key="overlay"
							data-dialogo-overlay=""
							onClick={() => modal.close()}
							variants={OVERLAY_VARIANTS}
						/>
						<m.div
							key="modal"
							data-dialogo-modal=""
							custom={bounds}
							variants={MODAL_VARIANTS}
						>
							<m.div
								data-dialogo-view-content
								ref={elementRef}
								variants={CONTENT_VARIANTS}
							>
								<AnimatePresence propagate mode="popLayout">
									<m.div
										key={activeView.id}
										initial="initial"
										animate="animate"
										exit="exit"
										variants={{
											initial: {
												opacity: 0,
												transition: {
													type: "ease",
													ease: [0.8, 0, 0, 0.8],
													duration: 0.4,
												},
											},
											animate: {
												opacity: 1,
												transition: {
													type: "ease",
													ease: [0.8, 0, 0, 0.8],
													duration: 0.4,
												},
											},
											exit: {
												opacity: 0,
												transition: {
													type: "ease",
													ease: [0.8, 0, 0, 0.8],
													duration: 0.4,
												},
											},
										}}
									>
										{activeView.element}
									</m.div>
								</AnimatePresence>
							</m.div>
						</m.div>
					</m.div>
				)}
			</AnimatePresence>
		</LazyMotion>
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
		y: "2%",
		scale: 0.9,
		rotateY: "20deg",
		rotateX: "6deg",
		filter: "blur(6px)",
		transition: { type: "ease", ease: [0.3, 0, 0, 0.6], duration: 0.3 },
	},
	animate: (bounds) => ({
		width: bounds.width,
		height: bounds.height,
		opacity: 1,
		y: "0%",
		scale: 1,
		rotateY: "0deg",
		rotateX: "0deg",
		filter: "blur(0px)",
		transition: {
			type: "ease",
			ease: [0.2, 0, 0, 0.8],
			duration: 0.4,
			width: { type: "ease", ease: [0.5, 0.1, 0.1, 0.9], duration: 0.4 },
			height: { type: "ease", ease: [0.5, 0.1, 0.1, 0.9], duration: 0.4 },
		},
	}),
	exit: {
		opacity: 0,
		y: "2%",
		scale: 0.9,
		rotateY: "20deg",
		rotateX: "6deg",
		filter: "blur(6px)",
		transition: { type: "ease", ease: [0.3, 0, 0, 0.6], duration: 0.3 },
	},
};

const CONTENT_VARIANTS: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

export const useDialogo = () => {
	const [state, setState] = useState<ModalState>(INITIAL_STATE);

	React.useEffect(() => {
		const unsubscribe = modal.subscribe(setState);
		return unsubscribe;
	}, []);

	return state;
};

const handleKeyEvents = (e) => {
	switch (e.key.toLowerCase()) {
		case "escape":
			modal.close();
	}
};

export default Dialogo;
