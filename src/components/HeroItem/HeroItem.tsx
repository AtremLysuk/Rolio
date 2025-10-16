import './HeroItem.scss';
import type { Color, TSlideData } from '../../sections/Hero/Hero';
import { FC, useRef, useState, useEffect } from 'react';
import Button from '../Button/Button';
import classNames from 'classnames';
import { useMatchMedia } from '../../Hooks/useMatchMedia';
import { addItem } from '../../redux/cartSlice';
import { useAppDispatch } from '../../Hooks/hooks';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type HeroItemProps = TSlideData & {
  index: number;
  isActive: boolean;
};

type TLink = {
  title: string;
  path: string;
  color: Color;
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
  isActive,
  slideHandler,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const dispatch = useAppDispatch();

  const [itemCount, setItemCount] = useState(0);
  const isLaptopWidth = useMatchMedia('(max-width: 900px)');

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const group = containerRef.current.querySelector('.slide-images__group');
      if (!group) return;

      const bg = group.querySelector('.slide-images__bg');
      const bottle = group.querySelector('.slide-images__bottle');
      const delicius = group.querySelector('.slide-images__delicius');

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });

      if (bg)
        tl.fromTo(
          bg,
          { opacity: 0, scale: 0.2 },
          { opacity: 1, scale: 1, duration: 0.6 }
        );

      if (bottle)
        tl.fromTo(
          bottle,
          { yPercent: 20, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' },
          '-=0.3'
        );

      if (delicius)
        tl.fromTo(
          delicius,
          { xPercent: -20, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          0.8
        );

      tlRef.current = tl;
    },
    { scope: containerRef }
  );

useGSAP(
  () => {
    if (!countRef.current) return;

    gsap.fromTo(
      countRef.current,
      { scale: 1.4, opacity: 0, y: -10 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'back.out(2)',
      }
    );
  },
  { dependencies: [itemCount] }
);

  useEffect(() => {
    if (!tlRef.current) return;

    if (isActive) {
      gsap.set(containerRef.current, { opacity: 1 });
      tlRef.current.restart();
    } else {
      tlRef.current.pause(0);
      gsap.set(containerRef.current, { opacity: 0 });
    }
  }, [isActive]);

  return (
    <div
      className={classNames(
        isActive
          ? 'hero-slide__wrapper hero-slide__wrapper active'
          : 'hero-slide__wrapper'
      )}
      ref={containerRef}
    >
      {isLaptopWidth && (
        <SliderHeader
          subtitle={subtitle}
          color={color}
          slideHandler={slideHandler}
        />
      )}

      <div className="hero-slide__images slide-images" ref={imagesRef}>
        <div className="slide-images__group">
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
              onClick={() => setItemCount((prev) => Math.max(0, prev - 1))}
            >
              -
            </button>
            <span className="body-count__value" ref={countRef}>
              {itemCount}
            </span>
            <button
              type="button"
              className="body-count__plus"
              onClick={() => setItemCount((prev) => prev + 1)}
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
                if (itemCount > 0) {
                  dispatch(
                    addItem({
                      id,
                      title,
                      price,
                      cartImgSrc,
                      count: itemCount,
                    })
                  );
                  setItemCount(0);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroItem;

// ---------------- SliderHeader ----------------

type HeaderProps = {
  subtitle: string;
  color: Color;
  slideHandler: (index: number) => void;
};

const SliderHeader: FC<HeaderProps> = ({ subtitle, color, slideHandler }) => {
  const slideLinks: TLink[] = [
    { title: 'Для салата', path: '/', color: 'green' },
    { title: 'Итальянское', path: '/', color: 'emerald' },
    { title: 'Для мяса', path: '/', color: 'red' },
    { title: 'Восточное', path: '/', color: 'orange' },
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
                'header-links__link',
                `header-links__link--${link.color}`,
                color === link.color && 'active'
              )}
              onClick={() => slideHandler(index)}
            >
              {link.title}
            </button>
          </li>
        ))}
      </nav>
    </header>
  );
};
