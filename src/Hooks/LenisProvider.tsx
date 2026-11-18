import {PropsWithChildren} from 'react';
import ReactLenis from 'lenis/react';

export const LenisProvider = ({children}: PropsWithChildren) => (
	<ReactLenis
		root
		options={{autoRaf: false}}
	>
		{children}
	</ReactLenis>
);
