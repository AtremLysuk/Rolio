import './HeroItem.scss';

import type { Color, TSlideData } from '../../sections/Hero/Hero';
import { FC } from 'react';
import Button from '../Button/Button';
import classNames from 'classnames';

type HeroItemProps = TSlideData;

type LinkColors = Color;

type TLink = {
  title: string;
  path: string;
  color: LinkColors;
};

const HeroItem: FC<HeroItemProps> = ({
  title,
  subtitle,
  text,
  images,
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
    <div className="hero-slide__wrapper">
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
        <div className="slide-body">
          <h1 className="slide-body__title h1">{title}</h1>
          <div className="slide-body__text">
            <p>{text}</p>
          </div>
          <div className="slide-body__count body-count">
            <button type='button' className='body-count__minus'>-</button>
            <span className='body-count__value'>2</span>
            <button type='button' className='body-count__plus'>+</button>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroItem;

// const SliderHeader:FC<HeroItemProps> = () => {
//  return (
//   <header className="slide__header">
//   <h3
//     className={classNames(
//       'slide__header-title',
//       `slide__header-title--${color}`
//     )}
//   >
//     {subtitle}
//   </h3>
//   <nav className="slide__header-links header-links">
//     {slideLinks.map((link, index) => (
//       <li className="header-links__item" key={link.title}>
//         <button
//           className={classNames(
//             color === link.color
//               ? `header-links__link header-links__link--${color} active`
//               : `header-links__link header-links__link--${color}`
//           )}
//           onClick={() => {
//             slideHandler(index);
//           }}
//         >
//           {link.title}
//         </button>
//       </li>
//     ))}
//   </nav>
// </header>
//  )
// }
