import ReactLenis from 'lenis/react';
import { useEffect, useRef, useState } from 'react';

export const LenisProvider = ({ children }: React.PropsWithChildren) => {
  const customRootRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const lenisRootEl = document.getElementById('lenis-root');
    if (lenisRootEl instanceof HTMLDivElement) {
      customRootRef.current = lenisRootEl;

      setIsMounted(true);
    }
  }, []);

  if (!isMounted) return null;

  return <ReactLenis root={customRootRef}>{children}</ReactLenis>;
};
