import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import Header from './sections/Header/Header';
import Hero from './sections/Hero/Hero';
import Oil from './sections/Oil/Oil';
import About from './sections/About/About';
import Reviews from './sections/Reviews/Reviews';
import Cart from './components/Cart/Cart';
import { useAppSelector, useAppDispatch } from './Hooks/hooks';
import Delivery from './sections/Delivery/Delivery';
import Contacts from './sections/Contacts/Contacts';
import Footer from './sections/Footer/Footer';
import { MessageModal } from './components/MessageModal/MessageModal';
import ThankModal from './components/ThankModal/ThankModal';
import ModalPortal from './components/ModalPortal/ModalPortal';

const App: React.FC = () => {
  const isMessageOpen = useAppSelector((state) => state.message.isMessageOpen);
  const isTnxMessageOpen = useAppSelector(
    (state) => state.message.isTnxMessageOpen
  );

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const dispatch = useAppDispatch();
  const lenis = useLenis();
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);

  useEffect(() => {
    const update = (time: number): void => {
      lenis?.raf?.(time * 1000);
    };

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, [lenis]);

  useEffect(() => {
    isMessageOpen || isTnxMessageOpen || isCartOpen
      ? lenis?.stop()
      : lenis?.start();
  }, [isMessageOpen, isTnxMessageOpen, isCartOpen]);

  useEffect(() => {
    if(cartItems.length === 0  ) {
      localStorage.removeItem('oilCart')
    }
    if (cartItems.length > 0) {
      localStorage.setItem('oilCart', JSON.stringify(cartItems));
    } 

  }, [cartItems]);


  return (
    <>
      <Header />
      <Hero />
      <Oil />
      <About />
      <Reviews />
      <Delivery />
      <Contacts />
      <Footer />

      {isCartOpen && (
        <ModalPortal>
          <Cart />
        </ModalPortal>
      )}
      {isMessageOpen && <MessageModal />}
      {isTnxMessageOpen && <ThankModal />}
    </>
  );
};

export default App;
