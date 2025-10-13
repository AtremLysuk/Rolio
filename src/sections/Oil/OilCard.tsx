import { FC, useState } from 'react';
import classNames from 'classnames';
import Button from '../../components/Button/Button';
import styles from './OilCard.module.scss';
import { addItem, minusItem, plusItem } from '../../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';

import { IProducts } from './Oil';

interface OilCardProps extends IProducts {
  index?: number;
}

const OilCard: FC<OilCardProps> = ({
  id,
  imgSrc,
  index,
  color,
  title,
  text,
  ingridients,
  price,
  cartImgSrc,
}) => {
  const [productCount, setProductCount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <li className={styles.card} key={id}>
      <div className={styles.image}>
        <img
          src={imgSrc}
          alt={title}
          className={index === 0 ? styles.firstFoto : ''}
          width={68}
          height={230}
          loading="lazy"
        />
      </div>

      <div className={styles.inner}>
        <h5 className={classNames(styles.title, styles[`title--${color}`])}>
          {title}
        </h5>

        <p className={styles.text}>{text}</p>
        <p className={styles.ingridients}>{ingridients}</p>

        <div className={styles.footer}>
          <div className={styles.count}>
            <button
              className={styles.btnMinus}
              aria-label="decrease product count"
              onClick={() => {
                if (productCount === 0) return;
                setProductCount((prev) => prev - 1);
                dispatch(minusItem(id));
                console.log(cartItems);
              }}
            >
              -
            </button>
            <p className={styles.value}>{productCount}</p>
            <button
              className={styles.btnPlus}
              aria-label="increase product count"
              onClick={() => {
                setProductCount((prev) => prev + 1);
                dispatch(plusItem(id));
              }}
            >
              +
            </button>
          </div>

          <p className={classNames(styles.price, styles[`price--${color}`])}>
            <span>250мл</span>
            {price} грн
          </p>
          <Button
            title="В корзину"
            aria-label="add item to cart"
            className={styles.btnAdd}
            color={color}
            onClick={() => {
              dispatch(
                addItem({
                  id,
                  title,
                  price,
                  cartImgSrc,
                  count: productCount,
                })
              );
              setProductCount(0)
            }}
          />
          <Button
            href="https://web.telegram.org/a/"
            title="Заказать в ТГ"
            className={styles.btnOrder}
            color={color}
            aria-label="order product in telegramm"
          />
        </div>
      </div>
    </li>
  );
};

export default OilCard;
