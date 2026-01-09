import ReactLenis from 'lenis/react';
import {PropsWithChildren} from "react";
// import { useRef, useState, useEffect } from 'react';

export const LenisProvider = ({children}: PropsWithChildren) => {
	// const rootRef = useRef<HTMLDivElement | null>(null);
	// const [mounted, setMounted] = useState(false);

	// useEffect(() => {
	//   const el = document.getElementById('lenis-root');
	//   if (el instanceof HTMLDivElement) {
	//     rootRef.current = el;
	//     setMounted(true);
	//   }
	// }, []);
	//
	// if (!mounted) return null;

	return (
		<ReactLenis
			root
			options={{autoRaf: false}}
		>
			<div id='lenis-root'>{children}</div>

		</ReactLenis>
	);
};
