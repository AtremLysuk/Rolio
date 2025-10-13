import { FC, useEffect, useRef } from 'react';
import styles from './MessageModal.module.scss';
import { useAppDispatch, useAppSelector } from '@/Hooks/hooks';
import { FocusTrap } from 'focus-trap-react';

import {
  msgModalClose,
  setUserMessage,
  tnxModalToggle,
} from '@/redux/messageSlice';
import { useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  phone: string;
  message: string;
};

export const MessageModal: FC = () => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setFocus,
  } = useForm<FormValues>({ mode: 'onChange' });

  const dispatch = useAppDispatch();
  const isMessageOpen = useAppSelector((state) => state.message.isMessageOpen);
  const isTnxMessageOpen = useAppSelector(
    (state) => state.message.isTnxMessageOpen
  );

  const onSubmit = (data: FormValues) => {

    dispatch(
      setUserMessage({
        userName: getValues('name'),
        message: getValues('message'),
      })
    );
    reset();
    dispatch(msgModalClose());
    dispatch(tnxModalToggle());
  };

  useEffect(() => {
    const escapeListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(msgModalClose());
      }
    };

    if (isMessageOpen) {
      document.body.addEventListener('keydown', escapeListener);
    }
    return () => {
      document.body.removeEventListener('keydown', escapeListener);
    };
  }, [isMessageOpen]);

  useEffect(() => {
    if (!isMessageOpen) return;
    setFocus('name');
  }, [isMessageOpen]);

  console.log(errors);

  return (
    <div
      className={styles.wrapper}
      ref={wrapperRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="message-title"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === wrapperRef.current) {
          dispatch(msgModalClose());
        }
      }}
    >
      <FocusTrap>
        <div className={styles.inner}>
          <header className={styles.header}>
            <h3 className={styles.title} id="message-title">
              Написать нам
            </h3>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => {
                dispatch(msgModalClose());
              }}
              ref={closeBtnRef}
              aria-label="Закрыть форму"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_1362)">
                  <path
                    d="M20.7577 0.719375C19.223 0.242063 17.6222 0 16 0C11.7262 0 7.70831 1.66431 4.68625 4.68625C1.66431 7.70831 0 11.7262 0 16C0 19.2062 0.945 22.2997 2.73281 24.9461C4.47719 27.5281 6.91131 29.5324 9.77188 30.7424C9.83162 30.7676 9.89363 30.7796 9.95463 30.7796C10.1377 30.7796 10.3116 30.6719 10.3874 30.4928C10.4885 30.2539 10.3767 29.9783 10.1378 29.8773C7.445 28.7384 5.15356 26.8513 3.51113 24.4202C1.82869 21.9298 0.939313 19.0181 0.939313 16C0.939313 11.9772 2.50588 8.19506 5.3505 5.3505C8.19506 2.50594 11.9772 0.939375 16 0.939375C17.5276 0.939375 19.0344 1.16712 20.4788 1.61637C20.7263 1.69331 20.9897 1.55512 21.0667 1.30737C21.1437 1.05969 21.0054 0.796438 20.7577 0.719375Z"
                    fill="#688800"
                  />
                  <path
                    d="M29.4406 7.31572C27.8098 4.79678 25.5161 2.79128 22.8073 1.51603C22.5726 1.40559 22.2929 1.50615 22.1823 1.7409C22.0718 1.97559 22.1725 2.2554 22.4072 2.3659C24.9571 3.56634 27.1166 5.45453 28.6521 7.82615C30.2279 10.2602 31.0609 13.0866 31.0609 15.9998C31.0609 20.0227 29.4942 23.8047 26.6497 26.6493C23.8052 29.4939 20.0231 31.0605 16.0002 31.0605C14.6331 31.0605 13.2782 30.8773 11.9735 30.5163C11.7236 30.4473 11.4648 30.5937 11.3956 30.8437C11.3264 31.0937 11.4729 31.3524 11.7229 31.4217C13.1093 31.8053 14.5484 31.9998 16.0002 31.9998C20.274 31.9998 24.2919 30.3356 27.3139 27.3136C30.3359 24.2915 32.0002 20.2736 32.0002 15.9998C32.0002 12.9051 31.1152 9.90215 29.4406 7.31572Z"
                    fill="#688800"
                  />
                  <path
                    d="M20.5917 19.9278L16.6638 16L20.5915 12.0722C20.775 11.8889 20.775 11.5914 20.5915 11.408C20.4082 11.2247 20.1107 11.2247 19.9274 11.408L15.9996 15.3358L12.0718 11.4081C11.8884 11.2247 11.591 11.2247 11.4076 11.4081C11.2242 11.5915 11.2242 11.8889 11.4076 12.0723L15.3354 16L11.4076 19.9278C11.2242 20.1113 11.2242 20.4086 11.4076 20.592C11.4993 20.6837 11.6195 20.7296 11.7397 20.7296C11.86 20.7296 11.9801 20.6837 12.0718 20.592L15.9996 16.6642L19.9274 20.592C20.0191 20.6837 20.1393 20.7296 20.2595 20.7296C20.3798 20.7296 20.4999 20.6837 20.5917 20.592C20.7751 20.4086 20.7751 20.1112 20.5917 19.9278Z"
                    fill="#688800"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_1362">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </header>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.nameLabel} htmlFor="name">
              Имя
              <input
                {...register('name', { required: 'Введите имя' })}
                className={styles.nameInput}
                type="text"
                placeholder="Пупкин Николай"
                required
                id="name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              {errors?.name && (
                <span id="name-error" role="alert" className={styles.error}>
                  {errors.name?.message}
                </span>
              )}
            </label>
            <label className={styles.phoneLabel} htmlFor="phone">
              Контактный номер телефона
              <input
                {...register('phone', {
                  required: 'Введите телефон',
                  pattern: {
                    value: /^\+?\d{10,15}$/,
                    message: 'Некорректный формат телефона',
                  },
                })}
                className={styles.phoneInput}
                type="text"
                placeholder="+380(888-88-88)"
                required
                id="phone"
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : ''}
              />
              {errors?.phone && (
                <span id="phone-error" role="alert" className={styles.error}>
                  {errors.phone?.message}
                </span>
              )}
            </label>
            <textarea
              {...register('message', {
                required: 'Вы забыли написать сообщение',
              })}
              className={styles.message}
              id="message"
              placeholder="Текст комментария"
              rows={4}
              aria-invalid={!!errors.message}
              aria-describedby="message-error"
            ></textarea>
            {errors?.message && (
              <span id="message-error" role="alert" className={styles.error}>
                {errors.message?.message}
              </span>
            )}
            <button className={styles.sendBtn} type="submit">
              ОТПРАВИТЬ
            </button>
          </form>
        </div>
      </FocusTrap>
    </div>
  );
};
