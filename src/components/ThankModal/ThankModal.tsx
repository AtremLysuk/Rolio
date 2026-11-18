import {FC, useCallback, useEffect, useRef} from 'react';
import {FocusTrap} from 'focus-trap-react';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import styles from './ThankModal.module.scss';
import CloseCircleIcon from '../CloseCircleIcon/CloseCircleIcon';
import {useAppDispatch, useAppSelector} from '@/Hooks/hooks';
import {tnxModalClose} from '@/redux/messageSlice';
import type {ThanksType} from '@/redux/messageSlice';

const THANKS_TEXT: Record<ThanksType, string> = {
	message: 'Ваше сообщение доставлено. Мы перезвоним вам в ближайшее время и ответим на все вопросы.',
	order: 'Ваш заказ принят. Мы свяжемся с вами, чтобы подтвердить детали и доставку.',
};

const ThankModal: FC = () => {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const isClosingRef = useRef(false);

	const dispatch = useAppDispatch();
	const {userName, type} = useAppSelector((state) => state.message.thanks);

	// Компонент монтируется только когда модалка открыта
	useGSAP(() => {
		gsap
			.timeline()
			.fromTo(wrapperRef.current, {opacity: 0}, {opacity: 1, duration: 0.5})
			.fromTo(
				containerRef.current,
				{opacity: 0, y: -50},
				{opacity: 1, y: 0, duration: 0.4, ease: 'power3.out'}
			);
	});

	const closeThankModal = useCallback(() => {
		if (isClosingRef.current) return;
		isClosingRef.current = true;

		gsap
			.timeline({
				onComplete: () => {
					dispatch(tnxModalClose());
				},
			})
			.to(containerRef.current, {opacity: 0, y: -50, duration: 0.5})
			.to(wrapperRef.current, {opacity: 0, duration: 0.2}, '-=0.3');
	}, [dispatch]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeThankModal();
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [closeThankModal]);

	return (
		<div
			className={styles.wrapper}
			ref={wrapperRef}
			onClick={(e) => {
				if (e.target === e.currentTarget) closeThankModal();
			}}
		>
			<FocusTrap
				focusTrapOptions={{
					initialFocus: () => closeBtnRef.current ?? false,
					escapeDeactivates: false,
					allowOutsideClick: true,
				}}
			>
				<div
					className={styles.inner}
					ref={containerRef}
					role="dialog"
					aria-modal="true"
					aria-labelledby="thank-title"
					aria-describedby="thank-text"
				>
					<header className={styles.header}>
						<h2
							className={styles.title}
							id="thank-title"
						>
							Спасибо{userName ? `, ${userName}` : ''}!
						</h2>
						<button
							type="button"
							className={styles.closeBtn}
							ref={closeBtnRef}
							aria-label="Закрыть"
							onClick={closeThankModal}
						>
							<CloseCircleIcon />
						</button>
					</header>
					<div className={styles.body}>
						<p id="thank-text">{THANKS_TEXT[type]}</p>
					</div>
				</div>
			</FocusTrap>
		</div>
	);
};

export default ThankModal;
