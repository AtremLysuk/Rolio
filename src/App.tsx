import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';

import { useEffect } from 'react';

import Header from './sections/Header/Header';
import Hero from './sections/Hero/Hero';

const App: React.FC = () => {
  const lenis = useLenis();

  useEffect(() => {
    const update = (time: number): void => {
      lenis?.raf?.(time * 1000);
    };

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, [lenis]);

  return (
    <ReactLenis root options={{ autoRaf: false }}>
      <Header />
      <Hero />
    </ReactLenis>
  );
};

export default App;
