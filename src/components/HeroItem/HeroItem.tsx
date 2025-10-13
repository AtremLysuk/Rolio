import './HeroItem.scss';

import type { Color, TSlideData } from '../../sections/Hero/Hero';
import { FC, useState } from 'react';
import Button from '../Button/Button';
import classNames from 'classnames';
import { useMatchMedia } from '../../Hooks/useMatchMedia';
import { addItem } from '../../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';

type HeroItemProps = TSlideData;

type LinkColors = Color;

type TLink = {
  title: string;
  path: string;
  color: LinkColors;
};

const HeroItem: FC<HeroItemProps> = ({
  id,
  title,
  subtitle,
  text,
  images,
  color,
  price,
  cartImgSrc,
  slideHandler,
}) => {
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useAppDispatch();
  const isLaptopWidth = useMatchMedia('(max-width: 900px)');

  const slideLinks: TLink[] = [
    {
      title: 'Для салата',
      path: '/',
      color: 'green',
    },
    {
      title: 'Итальянское',
      path: '/',
      color: 'emerald',
    },
    {
      title: 'Для мяса',
      path: '/',
      color: 'red',
    },
    {
      title: 'Восточное',
      path: '/',
      color: 'orange',
    },
  ];

  return (
    <div className="hero-slide__wrapper">
      {isLaptopWidth && (
        <SliderHeader
          subtitle={subtitle}
          color={color}
          slideHandler={slideHandler}
        />
      )}
      <div className="hero-slide__images slide-images">
        {images.map((image) => (
          <img
            className={classNames(`slide-images__${image.title}`)}
            src={image.imgSrc}
            alt=""
            width={image.width}
            height={image.height}
            loading="lazy"
            key={image.title}
          />
        ))}
      </div>
      <div className="hero-slide__content">
        {!isLaptopWidth && (
          <SliderHeader
            subtitle={subtitle}
            color={color}
            slideHandler={slideHandler}
          />
        )}
        <div className="slide-body">
          <h1 className="slide-body__title h1">{title}</h1>
          <div className="slide-body__text">
            <p>{text}</p>
          </div>
          <div className="slide-body__count body-count">
            <button
              type="button"
              className="body-count__minus"
              onClick={() => {
                if (itemCount <= 0) return;
                setItemCount((prev) => prev - 1);
              }}
            >
              -
            </button>
            <span className="body-count__value">{itemCount}</span>
            <button
              type="button"
              className="body-count__plus"
              onClick={() => {
                setItemCount((prev) => prev + 1);
              }}
            >
              +
            </button>
          </div>
          <div className="slide-body__buttons body-buttons">
            <Button
              className="body-buttons-more"
              title="ПОДРОБНЕЕ"
              color={color}
              href="/"
            />
            <Button
              className="body-buttons-add"
              title="В КОРЗИНУ"
              color={color}
              onClick={() => {
                dispatch(
                  addItem({
                    id: id,
                    title: title,
                    price: price,
                    cartImgSrc: cartImgSrc,
                    count: itemCount,
                  })
                );
                setItemCount(0);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroItem;

type HeaderProps = {
  subtitle: string;
  color: Color;

  slideHandler: (index: number) => void;
};

const SliderHeader: FC<HeaderProps> = ({
  subtitle,
  color,
  slideHandler,
}) => {
  const slideLinks: TLink[] = [
    {
      title: 'Для салата',
      path: '/',
      color: 'green',
    },
    {
      title: 'Итальянское',
      path: '/',
      color: 'emerald',
    },
    {
      title: 'Для мяса',
      path: '/',
      color: 'red',
    },
    {
      title: 'Восточное',
      path: '/',
      color: 'orange',
    },
  ];

  return (
    <header className="slide__header">
      <h3
        className={classNames(
          'slide__header-title',
          `slide__header-title--${color}`
        )}
      >
        {subtitle}
      </h3>
      <nav className="slide__header-links header-links">
        {slideLinks.map((link, index) => (
          <li className="header-links__item" key={link.title}>
            <button
              className={classNames(
                color === link.color
                  ? `header-links__link header-links__link--${color} active`
                  : `header-links__link header-links__link--${color}`
              )}
              onClick={() => {
                slideHandler(index);
              }}
            >
              {link.title}
            </button>
          </li>
        ))}
      </nav>
    </header>
  );
};
