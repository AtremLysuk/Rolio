import { useForm } from 'react-hook-form';
import styles from './Cart.module.scss';
import MyIcon from '../MyIcon/MyIcon';
import { useAppSelector, useAppDispatch } from '@/Hooks/hooks';
import {
  minusItem,
  openCartToggle,
  plusItem,
  removeItem,
} from './../../redux/cartSlice';
import { FC, useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
  const dispatch = useAppDispatch();
  const { isCartOpen, cartItems } = useAppSelector((state) => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Tfields>({ mode: 'onChange', shouldUnregister: true });

  const lenis = useLenis();

  const onSubmit = (data) => {
    console.log(data);
  };

  useGSAP(
    () => {
      if (!isCartOpen) return;

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    },
    { dependencies: [isCartOpen] }
  );

  const closeCartModal = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        dispatch(openCartToggle());
      },
    });

    tl.to(containerRef.current, { opacity: 0, y: -50, duration: 0.3 });

    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 });
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
    if (!containerRef.current) return;
    const focusableItems = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(
        '[data-tab], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
  }, []);

  return (
    <div
      data-lenis-prevent
      className={styles.wrapper}
      ref={overlayRef}
      aria-modal={true}
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
        role="dialog"
      >
        <header className={styles.cartHeader}>
          <h3 className={styles.sectionTitle} id="cart-title">
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
            <MyIcon
              className={styles.closeIcon}
              name="closeIcon"
              width="32"
              height="32"
              label="close btn"
            />
          </button>
        </header>
        <div className={styles.items}>
          {cartItems.length === 0 && <h2>Корзина пуста</h2>}
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className={styles.item} key={item.id}>
                <div className={styles.itemImage}>
                  <img
                    className=""
                    src={item.cartImgSrc}
                    alt=""
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
              </div>
            ))}
        </div>
        <form className={styles.cartForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.cartFormTop}>
            <label className={styles.nameLabel}>
              Имя получателя
              <input
                className={styles.nameInput}
                {...register('name', { required: 'Введите имя' })}
                type="text"
                placeholder="Фамилия Имя Отчество"
                id="name"
                required
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              {errors?.name && (
                <span id="name-error" role="alert" className={styles.error}>
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
                <span id="phone-error" role="alert" className={styles.error}>
                  {errors.phone.message}
                </span>
              )}
            </label>
          </div>

          <div className={styles.deliverySelect}>
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
              Новая почта
            </label>
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
              Укрпочта
            </label>
          </div>

          <div className={styles.deliveryWrapper}>
            {deliveryType === 'new' && (
              <fieldset className={styles.newWrapper} aria-live="polite">
                <legend>Новая почта</legend>
                <div className={styles.newPochta}>
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
              </fieldset>
            )}
            {deliveryType === 'ukr' && (
              <fieldset className={styles.ukrWrapper} aria-live="polite">
                <legend>Укрпочта</legend>
                <div className={styles.ukrPochta}>
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
                  <label htmlFor="ukrHouse">
                    <input
                      className={styles.ukrHouseInput}
                      {...register('ukrHouse', {
                        required: 'Введите номер дома',
                      })}
                      type="text"
                      placeholder="Дом"
                      id="ukrHouse"
                      aria-invalid={!!errors.ukrStreet}
                    />
                    <span
                      id="ukrStreet-error"
                      role="alert"
                      className={styles.error}
                    >
                      {errors.ukrStreet?.message}
                    </span>
                  </label>

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
                <button className={styles.submitBtn} type="submit">
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
