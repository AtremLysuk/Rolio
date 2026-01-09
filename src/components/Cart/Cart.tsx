import {useForm} from 'react-hook-form';
import styles from './Cart.module.scss';
import MyIcon from '../MyIcon/MyIcon';
import {useAppSelector, useAppDispatch} from '@/Hooks/hooks';
import {
	minusItem,
	openCartToggle,
	plusItem,
	removeItem,
	clearCart,
} from './../../redux/cartSlice';
import {FC, useEffect, useRef, useState} from 'react';
import {useLenis} from 'lenis/react';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';

type Tfields = {
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

const Cart: FC = () => {
	const [deliveryType, setDeliveryType] = useState<'new' | 'ukr'>('new');
	const overlayRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const submitBtnRef = useRef<HTMLButtonElement | null>(null);
	const dispatch = useAppDispatch();
	const {isCartOpen, cartItems} = useAppSelector((state) => state.cart);

	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
		reset,
	} = useForm<Tfields>({mode: 'onChange', shouldUnregister: true});

	const lenis = useLenis();

	const onSubmit = (data: Tfields) => {
		if (cartItems.length === 0) {
			alert('Корзина пуста');
			return;
		}
		const newOrder = {
			orderId: 1,
			client: [
				{
					name: data.name,
					phone: data.phone,
				},
			],
			delivery: [
				{
					method: deliveryType,
					methodInfo: {
						newCity: data.newCity,
						newOffice: data.newOffice,
						ukrIndex: data.ukrIndex,
						ukrCity: data.ukrCity,
						ukrStreet: data.ukrStreet,
						ukrHouse: data.ukrHouse,
						ukrApartment: data.ukrApartment,
					},
				},
			],

			message: data.message,
			oderItems: cartItems,
		};

		dispatch(clearCart());
		reset();


	};

	useGSAP(
		() => {
			if (!isCartOpen) return;

			gsap.fromTo(
				overlayRef.current,
				{opacity: 0},
				{opacity: 1, duration: 0.3}
			);

			gsap.fromTo(
				containerRef.current,
				{opacity: 0, y: -50},
				{opacity: 1, y: 0, duration: 0.4, ease: 'power3.out'}
			);
		},
		{dependencies: [isCartOpen]}
	);

	const closeCartModal = () => {
		const tl = gsap.timeline({
			onComplete: () => {
				dispatch(openCartToggle());
			},
		});

		tl.to(containerRef.current, {opacity: 0, y: -50, duration: 0.3});

		tl.to(overlayRef.current, {opacity: 0, duration: 0.2});
	};

	useEffect(() => {
		if (isCartOpen) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.body.style.overflow = '';
			lenis?.resize();
		};
	}, [isCartOpen]);

	useEffect(() => {
		if (!containerRef.current || !isCartOpen) return;
		const focusableItems = Array.from(
			containerRef.current?.querySelectorAll<HTMLElement>(
				'[data-tab], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		);

		if (focusableItems.length === 0) return;

		requestAnimationFrame(() => {
			closeBtnRef.current?.focus();
		});
		const first = focusableItems[0];
		const last = focusableItems[focusableItems.length - 1];

		const handleTab = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			const active = document.activeElement as HTMLElement;
			if (active === last) {
				e.preventDefault();
				first.focus();
			}
		};

		containerRef.current.addEventListener('keydown', handleTab);

		return () => {
			containerRef.current?.removeEventListener('keydown', handleTab);
		};
	}, []);

	useEffect(() => {
		const escapeListener = (e: KeyboardEvent): void => {
			if (e.key !== 'Escape') return;

			closeCartModal();
		};
		if (isCartOpen && lenis) {
			document.addEventListener('keydown', escapeListener);
		}
		return () => {
			document.removeEventListener('keydown', escapeListener);
		};
	}, [isCartOpen]);

	return (
		<div
			data-lenis-prevent
			className={styles.wrapper}
			ref={overlayRef}

			onClick={(e: React.MouseEvent<HTMLDivElement>) => {
				if (e.target === e.currentTarget) {
					closeCartModal();
				}
			}}
		>
			<div
				className={styles.body}
				ref={containerRef}
				aria-labelledby="cart-title"
				aria-describedby='cart-desc'
				role="dialog"
				aria-modal={true}
			>
				<header className={styles.cartHeader}>
					<p
						id="cart-desc"
						className="visually-hidden"
					>
						Форма оформления заказа и корзина товаров
					</p>
					<h3
						className={styles.sectionTitle}
						id="cart-title"
					>
						КОРЗИНА
					</h3>
					<button
						className={styles.closeBtn}
						type="button"
						ref={closeBtnRef}
						aria-label="close cart"
						onClick={() => {
							closeCartModal();
						}}
					>
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clipPath="url(#clip0_1_2520)">
								<path
									d="M20.7577 0.719375C19.223 0.242063 17.6222 0 16 0C11.7262 0 7.70831 1.66431 4.68625 4.68625C1.66431 7.70831 0 11.7262 0 16C0 19.2062 0.945 22.2997 2.73281 24.9461C4.47719 27.5281 6.91131 29.5324 9.77188 30.7424C9.83162 30.7676 9.89363 30.7796 9.95463 30.7796C10.1377 30.7796 10.3116 30.6719 10.3874 30.4928C10.4885 30.2539 10.3767 29.9783 10.1378 29.8773C7.445 28.7384 5.15356 26.8513 3.51113 24.4202C1.82869 21.9298 0.939313 19.0181 0.939313 16C0.939313 11.9772 2.50588 8.19506 5.3505 5.3505C8.19506 2.50594 11.9772 0.939375 16 0.939375C17.5276 0.939375 19.0344 1.16712 20.4788 1.61637C20.7263 1.69331 20.9897 1.55512 21.0667 1.30737C21.1437 1.05969 21.0054 0.796438 20.7577 0.719375Z"
									fill="#688800"
								/>
								<path
									d="M29.4404 7.31621C27.8096 4.79727 25.5158 2.79177 22.8071 1.51652C22.5724 1.40608 22.2926 1.50664 22.1821 1.74139C22.0716 1.97608 22.1722 2.25589 22.4069 2.36639C24.9569 3.56683 27.1164 5.45502 28.6518 7.82664C30.2276 10.2606 31.0606 13.0871 31.0606 16.0003C31.0606 20.0231 29.494 23.8052 26.6494 26.6498C23.8049 29.4944 20.0228 31.061 16 31.061C14.6328 31.061 13.278 30.8778 11.9732 30.5168C11.7234 30.4478 11.4646 30.5941 11.3953 30.8442C11.3261 31.0941 11.4727 31.3529 11.7227 31.4221C13.1091 31.8058 14.5482 32.0003 16 32.0003C20.2737 32.0003 24.2917 30.3361 27.3137 27.3141C30.3357 24.292 32 20.2741 32 16.0003C32 12.9056 31.1149 9.90264 29.4404 7.31621Z"
									fill="#688800"
								/>
								<path
									d="M20.5917 19.9278L16.6638 16L20.5915 12.0722C20.775 11.8889 20.775 11.5914 20.5915 11.408C20.4082 11.2247 20.1107 11.2247 19.9274 11.408L15.9996 15.3358L12.0718 11.4081C11.8884 11.2247 11.591 11.2247 11.4076 11.4081C11.2242 11.5915 11.2242 11.8889 11.4076 12.0723L15.3354 16L11.4076 19.9278C11.2242 20.1113 11.2242 20.4086 11.4076 20.592C11.4993 20.6837 11.6195 20.7296 11.7397 20.7296C11.86 20.7296 11.9801 20.6837 12.0718 20.592L15.9996 16.6642L19.9274 20.592C20.0191 20.6837 20.1393 20.7296 20.2595 20.7296C20.3798 20.7296 20.4999 20.6837 20.5917 20.592C20.7751 20.4086 20.7751 20.1112 20.5917 19.9278Z"
									fill="#688800"
								/>
							</g>
							<defs>
								<clipPath id="clip0_1_2520">
									<rect
										width="32"
										height="32"
										fill="white"
									/>
								</clipPath>
							</defs>
						</svg>
					</button>
				</header>
				<ul className={styles.items}>
					{cartItems.length === 0 && <h2>Корзина пуста</h2>}
					{cartItems.length >= 1 &&
						cartItems.map((item) => (
							<li
								className={styles.item}
								key={item.id}
							>
								<div className={styles.itemImage}>
									<img
										src={item.cartImgSrc}
										alt={`Фото товара ${item.title}`}
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
											type='button'
											className={styles.btnMinus}
											aria-label={`уменьшить количество ${item.title}`}
											onClick={() => {
												dispatch(minusItem(item.id));
											}}
										>
											-
										</button>
										<span className={styles.itemCount}>{item.count}</span>
										<button
											type='button'
											className={styles.btnPlus}
											aria-label={`увеличить количество ${item.title}`}
											onClick={() => {
												dispatch(plusItem(item.id));
											}}
										>
											+
										</button>
									</div>
								</div>
								<div className={styles.itemPrice}>
									<p>{item.price * item.count}грн</p>
									<button
										className={styles.itemRemove}
										aria-label={`удалить ${item.title} из корзины`}
										onClick={() => {
											dispatch(removeItem(item.id));
										}}
										type='button'
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
				<form
					className={styles.cartForm}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className={styles.cartFormTop}>
						<label className={styles.nameLabel}>
							Имя получателя
							<input
								className={styles.nameInput}
								{...register('name', {required: 'Введите имя'})}
								type="text"
								placeholder="Фамилия Имя Отчество"
								id="name"
								aria-invalid={!!errors.name}
								aria-describedby="name-error"
							/>
							{errors?.name && (
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
								{...register('phone', {
									required: 'Введите телефон',
									pattern: {
										value: /^\+?\d{10,15}$/,
										message: 'Некорректный формат телефона',
									},
								})}
								type="tel"
								placeholder="+380"
								aria-describedby="phone-error"
								aria-invalid={!!errors.phone}
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
									aria-checked={deliveryType === 'new'}
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
									aria-checked={deliveryType === 'ukr'}
									checked={deliveryType === 'ukr'}
									onChange={() => setDeliveryType('ukr')}
								/>
								<span className={styles.radioFake}></span>
								Укрпочта
							</label>
						</div>
					</div>

					<div className={styles.deliveryWrapper}>
						{deliveryType === 'new' && (
							<fieldset
								className={styles.newWrapper}
								aria-live="polite"
							>
								<legend>Новая почта</legend>
								<div className={styles.newPochta}>
									<div className={styles.field}>
										<label htmlFor="newCity">
											<input
												className={styles.newPochtaCityInput}
												{...register('newCity', {
													required: 'Это поле обязательно',
												})}
												type="text"
												id="newCity"
												aria-describedby="newcity-error"
												aria-invalid={!!errors.newCity}
												placeholder="Город"
											/>
											{errors?.newCity && (
												<span
													id="newcity-error"
													role="alert"
													className={styles.error}
												>
                          {errors.newCity.message}
                        </span>
											)}
										</label>
									</div>
									<div className={styles.field}>
										<label htmlFor="newOffice">
											<input
												className={styles.newPochtaOfficeInput}
												{...register('newOffice', {
													required: 'Это поле обязательно',
												})}
												type="text"
												aria-invalid={!!errors.newOffice}
												aria-describedby="newOffice-error"
												placeholder="Отделение №"
												id="newOffice"
											/>
											{errors?.newOffice && (
												<span
													id="newOffice-error"
													role="alert"
													className={styles.error}
												>
                          {errors.newOffice.message}
                        </span>
											)}
										</label>
									</div>
								</div>
							</fieldset>
						)}
						{deliveryType === 'ukr' && (
							<fieldset
								className={styles.ukrWrapper}
								aria-live="polite"
							>
								<legend>Укрпочта</legend>
								<div className={styles.ukrPochta}>
									<div className={styles.field}>
										<label htmlFor="ukrIndex">
											<input
												className={styles.ukrIndexInput}
												{...register('ukrIndex', {
													required: 'Это поле обязательно',
													pattern: {
														value: /^\d{5}$/,
														message: 'некорректный формат',
													},
												})}
												type="text"
												aria-invalid={!!errors.ukrIndex}
												placeholder="49000"
												id="ukrIndex"
											/>
											{errors?.ukrIndex && (
												<span
													id="ukrIndex-error"
													role="alert"
													className={styles.error}
												>
                          {errors.ukrIndex.message}
                        </span>
											)}
										</label>
									</div>

									<div className={styles.field}>
										<label htmlFor="ukrCity">
											<input
												className={styles.ukrCityInput}
												{...register('ukrCity', {
													required: 'Это поле обязательно',
												})}
												aria-invalid={!!errors.ukrCity}
												aria-describedby="ukrCity-error"
												placeholder="Город"
												type="text"
												id="ukrCity"
											/>
											{errors?.ukrCity && (
												<span
													id="ukrCity-error"
													role="alert"
													className={styles.error}
												>
                          {errors.ukrCity.message}
                        </span>
											)}
										</label>
									</div>

									<div className={styles.field}>
										<label htmlFor="ukrStreet">
											<input
												className={styles.ukrStreetInput}
												{...register('ukrStreet', {
													required: 'Введите название улицы',
												})}
												type="text"
												aria-invalid={!!errors.ukrStreet}
												aria-describedby="ukrStreet-error"
												placeholder="Улица"
												id="ukrStreet"
											/>
											{errors?.ukrStreet && (
												<span
													id="ukrStreet-error"
													role="alert"
													className={styles.error}
												>
                          {errors.ukrStreet?.message}
                        </span>
											)}
										</label>
									</div>

									<div className={styles.field}>
										<label htmlFor="ukrHouse">
											<input
												className={styles.ukrHouseInput}
												{...register('ukrHouse', {
													required: 'Введите номер дома',
												})}
												type="text"
												placeholder="Дом"
												id="ukrHouse"
												aria-invalid={!!errors.ukrHouse}
											/>
											<span
												id="ukrHouse-error"
												role="alert"
												className={styles.error}
											>
                        {errors.ukrHouse?.message}
                      </span>
										</label>
									</div>

									<div className={styles.field}>
										<label htmlFor="ukrApartment">
											<input
												className={styles.ukrApartment}
												{...register('ukrApartment')}
												type="text"
												aria-invalid={!!errors.ukrApartment}
												aria-describedby="ukrApartment-error"
												placeholder="квартира"
												id="ukrApartment"
											/>
											{errors?.ukrApartment && (
												<span
													id="ukrApartment-error"
													role="alert"
													className={styles.error}
												>
                          {errors.ukrApartment?.message}
                        </span>
											)}
										</label>
									</div>
								</div>
							</fieldset>
						)}
						<div className={styles.formFooter}>
							<label className={styles.messageLabel}>
                <textarea
	                className={styles.formMessage}
	                {...register('message')}
	                placeholder="Ваш комментарий к заказу"
	                rows={4}
	                aria-label="Ваш комментарий к заказу"
                />
							</label>
							<div className={styles.formButtons}>
								<button
									className={styles.submitBtn}
									type="submit"
									ref={submitBtnRef}
									disabled={!isValid}
								>
									ОТПРАВИТЬ ЗАКАЗ
								</button>
								<button
									className={styles.resetBtn}
									type="reset"
									onClick={() => reset()}
								>
									СБРОСИТЬ
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Cart;
