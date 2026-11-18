import {FC, useEffect} from 'react';
import {useLenis} from 'lenis/react';
import {gsap} from 'gsap';
import Header from './sections/Header/Header';
import Hero from './sections/Hero/Hero';
import Oil from './sections/Oil/Oil';
import About from './sections/About/About';
import Reviews from './sections/Reviews/Reviews';
import Delivery from './sections/Delivery/Delivery';
import Contacts from './sections/Contacts/Contacts';
import Footer from './sections/Footer/Footer';
import Cart from './components/Cart/Cart';
import {MessageModal} from './components/MessageModal/MessageModal';
import ThankModal from './components/ThankModal/ThankModal';
import ModalPortal from './components/ModalPortal/ModalPortal';
import {useAppSelector} from './Hooks/hooks';

const App: FC = () => {
	const isMessageOpen = useAppSelector((state) => state.message.isMessageOpen);
	const isTnxMessageOpen = useAppSelector((state) => state.message.isTnxMessageOpen);
	const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
	const cartItems = useAppSelector((state) => state.cart.cartItems);
	const lenis = useLenis();

	// Lenis работает от тикера GSAP, чтобы скролл и анимации шли в одном кадре
	useEffect(() => {
		if (!lenis) return;

		const update = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(update);

		return () => gsap.ticker.remove(update);
	}, [lenis]);

	// Пока открыта любая модалка, страница под ней не скроллится
	useEffect(() => {
		if (!lenis) return;

		if (isMessageOpen || isTnxMessageOpen || isCartOpen) {
			lenis.stop();
		} else {
			lenis.start();
		}
	}, [lenis, isMessageOpen, isTnxMessageOpen, isCartOpen]);

	useEffect(() => {
		if (cartItems.length > 0) {
			localStorage.setItem('oilCart', JSON.stringify(cartItems));
		} else {
			localStorage.removeItem('oilCart');
		}
	}, [cartItems]);

	return (
		<>
			<Header />
			<main id="main-content">
				<Hero />
				<Oil />
				<About />
				<Reviews />
				<Delivery />
				<Contacts />
			</main>
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
