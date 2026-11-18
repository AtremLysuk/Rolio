import {FC, useCallback, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {FocusTrap} from 'focus-trap-react';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import styles from './MessageModal.module.scss';
import CloseCircleIcon from '../CloseCircleIcon/CloseCircleIcon';
import {useAppDispatch} from '@/Hooks/hooks';
import {msgModalClose, openThanks} from '@/redux/messageSlice';

type FormValues = {
	name: string;
	phone: string;
	message: string;
};

export const MessageModal: FC = () => {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const isClosingRef = useRef(false);
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<FormValues>({mode: 'onChange'});

	// Компонент монтируется только когда модалка открыта
	useGSAP(() => {
		gsap.fromTo(wrapperRef.current, {opacity: 0}, {opacity: 1, duration: 0.5});
		gsap.fromTo(
			containerRef.current,
			{opacity: 0, y: -50},
			{opacity: 1, y: 0, duration: 0.4, ease: 'power3.out'}
		);
	});

	const closeMessageModal = useCallback(
		(onClosed?: () => void) => {
			if (isClosingRef.current) return;
			isClosingRef.current = true;

			gsap
				.timeline({
					onComplete: () => {
						dispatch(msgModalClose());
						onClosed?.();
					},
				})
				.to(containerRef.current, {opacity: 0, y: -50, duration: 0.5})
				.to(wrapperRef.current, {opacity: 0, duration: 0.2}, '-=0.3');
		},
		[dispatch]
	);

	const onSubmit = (data: FormValues) => {
		closeMessageModal(() => {
			reset();
			dispatch(openThanks({userName: data.name, type: 'message'}));
		});
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeMessageModal();
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [closeMessageModal]);

	return (
		<div
			className={styles.wrapper}
			ref={wrapperRef}
			onClick={(e) => {
				if (e.target === e.currentTarget) closeMessageModal();
			}}
		>
			<FocusTrap
				focusTrapOptions={{
					initialFocus: '#msg-name',
					escapeDeactivates: false,
					allowOutsideClick: true,
				}}
			>
				<div
					className={styles.inner}
					ref={containerRef}
					role="dialog"
					aria-modal="true"
					aria-labelledby="message-title"
				>
					<header className={styles.header}>
						<h2
							className={styles.title}
							id="message-title"
						>
							Написать нам
						</h2>
						<button
							type="button"
							className={styles.closeBtn}
							aria-label="Закрыть форму"
							onClick={() => closeMessageModal()}
						>
							<CloseCircleIcon />
						</button>
					</header>

					<form
						className={styles.form}
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						<label
							className={styles.nameLabel}
							htmlFor="msg-name"
						>
							Имя
							<input
								id="msg-name"
								className={styles.nameInput}
								type="text"
								placeholder="Пупкин Николай"
								autoComplete="name"
								aria-invalid={!!errors.name}
								aria-describedby={errors.name ? 'msg-name-error' : undefined}
								{...register('name', {required: 'Введите имя'})}
							/>
							{errors.name && (
								<span
									id="msg-name-error"
									role="alert"
									className={styles.error}
								>
									{errors.name.message}
								</span>
							)}
						</label>

						<label
							className={styles.phoneLabel}
							htmlFor="msg-phone"
						>
							Контактный номер телефона
							<input
								id="msg-phone"
								className={styles.phoneInput}
								type="tel"
								placeholder="+380XXXXXXXXX"
								autoComplete="tel"
								aria-invalid={!!errors.phone}
								aria-describedby={errors.phone ? 'msg-phone-error' : undefined}
								{...register('phone', {
									required: 'Введите телефон',
									pattern: {
										value: /^\+?\d{10,15}$/,
										message: 'Некорректный формат телефона',
									},
								})}
							/>
							{errors.phone && (
								<span
									id="msg-phone-error"
									role="alert"
									className={styles.error}
								>
									{errors.phone.message}
								</span>
							)}
						</label>

						<div className={styles.field}>
							<label
								htmlFor="msg-text"
								className="visually-hidden"
							>
								Текст сообщения
							</label>
							<textarea
								id="msg-text"
								className={styles.message}
								placeholder="Текст комментария"
								rows={4}
								aria-invalid={!!errors.message}
								aria-describedby={errors.message ? 'msg-text-error' : undefined}
								{...register('message', {
									required: 'Вы забыли написать сообщение',
								})}
							/>
							{errors.message && (
								<span
									id="msg-text-error"
									role="alert"
									className={styles.error}
								>
									{errors.message.message}
								</span>
							)}
						</div>

						<button
							className={styles.sendBtn}
							type="submit"
						>
							ОТПРАВИТЬ
						</button>
					</form>
				</div>
			</FocusTrap>
		</div>
	);
};
