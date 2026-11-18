import {FC, useCallback, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import type {RegisterOptions} from 'react-hook-form';
import {FocusTrap} from 'focus-trap-react';
import {useLenis} from 'lenis/react';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import styles from './Cart.module.scss';
import MyIcon from '../MyIcon/MyIcon';
import CloseCircleIcon from '../CloseCircleIcon/CloseCircleIcon';
import {useAppSelector, useAppDispatch} from '@/Hooks/hooks';
import {
	minusItem,
	openCartToggle,
	plusItem,
	removeItem,
	clearCart,
	selectCartTotalPrice,
} from '@/redux/cartSlice';
import {openThanks} from '@/redux/messageSlice';

type CartFields = {
	name: string;
	phone: string;
	newCity?: string;
	newOffice?: string;
	ukrIndex?: string;
	ukrCity?: string;
	ukrStreet?: string;
	ukrHouse?: string;
	ukrApartment?: string;
	message?: string;
};

type DeliveryType = 'new' | 'ukr';

type DeliveryField = {
	name: keyof CartFields;
	placeholder: string;
	className: string;
	rules?: RegisterOptions<CartFields>;
};

const REQUIRED = 'Это поле обязательно';

const DELIVERY_FIELDS: Record<DeliveryType, DeliveryField[]> = {
	new: [
		{
			name: 'newCity',
			placeholder: 'Город',
			className: styles.newPochtaCityInput,
			rules: {required: REQUIRED},
		},
		{
			name: 'newOffice',
			placeholder: 'Отделение №',
			className: styles.newPochtaOfficeInput,
			rules: {required: REQUIRED},
		},
	],
	ukr: [
		{
			name: 'ukrIndex',
			placeholder: '49000',
			className: styles.ukrIndexInput,
			rules: {
				required: REQUIRED,
				pattern: {value: /^\d{5}$/, message: 'Индекс — 5 цифр'},
			},
		},
		{
			name: 'ukrCity',
			placeholder: 'Город',
			className: styles.ukrCityInput,
			rules: {required: REQUIRED},
		},
		{
			name: 'ukrStreet',
			placeholder: 'Улица',
			className: styles.ukrStreetInput,
			rules: {required: 'Введите название улицы'},
		},
		{
			name: 'ukrHouse',
			placeholder: 'Дом',
			className: styles.ukrHouseInput,
			rules: {required: 'Введите номер дома'},
		},
		{
			name: 'ukrApartment',
			placeholder: 'Квартира',
			className: styles.ukrApartment,
		},
	],
};

const Cart: FC = () => {
	const [deliveryType, setDeliveryType] = useState<DeliveryType>('new');
	const overlayRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const isClosingRef = useRef(false);

	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((state) => state.cart.cartItems);
	const totalPrice = useAppSelector(selectCartTotalPrice);
	const lenis = useLenis();

	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
		reset,
	} = useForm<CartFields>({mode: 'onChange', shouldUnregister: true});

	// Анимация закрытия; onClosed вызывается, когда корзина уже скрыта
	const closeCart = useCallback(
		(onClosed?: () => void) => {
			if (isClosingRef.current) return;
			isClosingRef.current = true;

			gsap
				.timeline({
					onComplete: () => {
						dispatch(openCartToggle());
						onClosed?.();
					},
				})
				.to(containerRef.current, {opacity: 0, y: -50, duration: 0.3})
				.to(overlayRef.current, {opacity: 0, duration: 0.2});
		},
		[dispatch]
	);

	const onSubmit = (data: CartFields) => {
		closeCart(() => {
			dispatch(clearCart());
			reset();
			dispatch(openThanks({userName: data.name, type: 'order'}));
		});
	};

	// Анимация открытия — компонент монтируется только когда корзина открыта
	useGSAP(() => {
		gsap.fromTo(overlayRef.current, {opacity: 0}, {opacity: 1, duration: 0.3});
		gsap.fromTo(
			containerRef.current,
			{opacity: 0, y: -50},
			{opacity: 1, y: 0, duration: 0.4, ease: 'power3.out'}
		);
	});

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = '';
			lenis?.resize();
		};
	}, [lenis]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeCart();
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [closeCart]);

	const renderDeliveryField = ({name, placeholder, className, rules}: DeliveryField) => {
		const error = errors[name];
		const errorId = `${name}-error`;

		return (
			<div
				className={styles.field}
				key={name}
			>
				<label htmlFor={name}>
					<span className="visually-hidden">{placeholder}</span>
					<input
						id={name}
						className={className}
						type="text"
						placeholder={placeholder}
						aria-invalid={!!error}
						aria-describedby={error ? errorId : undefined}
						{...register(name, rules)}
					/>
					{error && (
						<span
							id={errorId}
							role="alert"
							className={styles.error}
						>
							{error.message}
						</span>
					)}
				</label>
			</div>
		);
	};

	return (
		<div
			data-lenis-prevent
			className={styles.wrapper}
			ref={overlayRef}
			onClick={(e) => {
				if (e.target === e.currentTarget) closeCart();
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
					className={styles.body}
					ref={containerRef}
					role="dialog"
					aria-modal="true"
					aria-labelledby="cart-title"
					aria-describedby="cart-desc"
				>
					<header className={styles.cartHeader}>
						<p
							id="cart-desc"
							className="visually-hidden"
						>
							Форма оформления заказа и корзина товаров
						</p>
						<h2
							className={styles.sectionTitle}
							id="cart-title"
						>
							КОРЗИНА
						</h2>
						<button
							className={styles.closeBtn}
							type="button"
							ref={closeBtnRef}
							aria-label="Закрыть корзину"
							onClick={() => closeCart()}
						>
							<CloseCircleIcon />
						</button>
					</header>

					{cartItems.length === 0 ? (
						<p className={styles.empty}>Корзина пуста</p>
					) : (
						<>
							<ul className={styles.items}>
								{cartItems.map((item) => (
									<li
										className={styles.item}
										key={item.id}
									>
										<div className={styles.itemImage}>
											<img
												src={item.cartImgSrc}
												alt={item.title}
												width="90"
												height="90"
												loading="lazy"
											/>
										</div>
										<div className={styles.itemBody}>
											<div className={styles.itemBodyTop}>
												<p>
													{item.title}
													<span>250мл</span>
												</p>
											</div>
											<div className={styles.itemBodyButtons}>
												<button
													type="button"
													className={styles.btnMinus}
													aria-label={`Уменьшить количество: ${item.title}`}
													onClick={() => dispatch(minusItem(item.id))}
												>
													-
												</button>
												<span className={styles.itemCount}>{item.count}</span>
												<button
													type="button"
													className={styles.btnPlus}
													aria-label={`Увеличить количество: ${item.title}`}
													onClick={() => dispatch(plusItem(item.id))}
												>
													+
												</button>
											</div>
										</div>
										<div className={styles.itemPrice}>
											<p>{item.price * item.count} грн</p>
											<button
												type="button"
												className={styles.itemRemove}
												aria-label={`Удалить из корзины: ${item.title}`}
												onClick={() => dispatch(removeItem(item.id))}
											>
												<MyIcon
													className={styles.closeBtn}
													name="closeIcon"
													width="24"
													height="24"
													label="remove-icon"
												/>
											</button>
										</div>
									</li>
								))}
							</ul>
							<p className={styles.total}>
								Итого: <span>{totalPrice} грн</span>
							</p>
						</>
					)}

					<form
						className={styles.cartForm}
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						<div className={styles.cartFormTop}>
							<label className={styles.nameLabel}>
								Имя получателя
								<input
									className={styles.nameInput}
									type="text"
									placeholder="Фамилия Имя Отчество"
									autoComplete="name"
									aria-invalid={!!errors.name}
									aria-describedby={errors.name ? 'name-error' : undefined}
									{...register('name', {required: 'Введите имя'})}
								/>
								{errors.name && (
									<span
										id="name-error"
										role="alert"
										className={styles.error}
									>
										{errors.name.message}
									</span>
								)}
							</label>
							<label className={styles.phoneLabel}>
								Контактный номер телефона
								<input
									className={styles.phoneInput}
									type="tel"
									placeholder="+380"
									autoComplete="tel"
									aria-invalid={!!errors.phone}
									aria-describedby={errors.phone ? 'phone-error' : undefined}
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
										id="phone-error"
										role="alert"
										className={styles.error}
									>
										{errors.phone.message}
									</span>
								)}
							</label>
						</div>

						<div className={styles.deliverySelect}>
							<div className={styles.field}>
								<label
									className={styles.deliverySelectNewLabel}
									htmlFor="newSelect"
								>
									<input
										className={styles.deliverySelectNewInput}
										type="radio"
										name="delivery"
										id="newSelect"
										value="new"
										checked={deliveryType === 'new'}
										onChange={() => setDeliveryType('new')}
									/>
									<span className={styles.radioFake}></span>
									Новая почта
								</label>
							</div>
							<div className={styles.field}>
								<label
									className={styles.deliverySelectUkrLabel}
									htmlFor="ukrSelect"
								>
									<input
										className={styles.deliverySelectUkrInput}
										type="radio"
										name="delivery"
										id="ukrSelect"
										value="ukr"
										checked={deliveryType === 'ukr'}
										onChange={() => setDeliveryType('ukr')}
									/>
									<span className={styles.radioFake}></span>
									Укрпочта
								</label>
							</div>
						</div>

						<div className={styles.deliveryWrapper}>
							<fieldset className={deliveryType === 'new' ? styles.newWrapper : styles.ukrWrapper}>
								<legend>{deliveryType === 'new' ? 'Новая почта' : 'Укрпочта'}</legend>
								<div className={deliveryType === 'new' ? styles.newPochta : styles.ukrPochta}>
									{DELIVERY_FIELDS[deliveryType].map(renderDeliveryField)}
								</div>
							</fieldset>

							<div className={styles.formFooter}>
								<label className={styles.messageLabel}>
									<span className="visually-hidden">Ваш комментарий к заказу</span>
									<textarea
										className={styles.formMessage}
										placeholder="Ваш комментарий к заказу"
										rows={4}
										{...register('message')}
									/>
								</label>
								<div className={styles.formButtons}>
									<button
										className={styles.submitBtn}
										type="submit"
										disabled={!isValid || cartItems.length === 0}
									>
										ОТПРАВИТЬ ЗАКАЗ
									</button>
									<button
										className={styles.resetBtn}
										type="button"
										onClick={() => reset()}
									>
										СБРОСИТЬ
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</FocusTrap>
		</div>
	);
};

export default Cart;
