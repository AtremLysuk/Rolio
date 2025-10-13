import styles from './Oil.module.scss';
import { FC } from 'react';
import OilCard from './OilCard';
import { useMatchMedia } from '../../Hooks/useMatchMedia';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import classNames from 'classnames';

type Color = 'green' | 'red' | 'orange' | 'emerald';

export interface IProducts {
  id: number;
  title: string;
  text: string;
  ingridients: string;
  price: number;
  imgSrc: string;
  color: Color;
  cartImgSrc?: string;
}

const Oil: FC = () => {
  const isSliderWidth: boolean = useMatchMedia('(max-width: 1050px)');

  const products: IProducts[] = [
    {
      id: 1,
      title: 'Масло “Для салата”',
      text: 'Название говорит само за себя. Это идеальная заправка, которая даже скучной и привычной капусте придаст неповторимый вкус и аромат.',
      ingridients:
        'Состав: оливковое масло холодного отжима, розмарин, тимьян, базилик, орегано, чеснок, смесь из 5 перцев.',
      price: 115,
      imgSrc: '/images/oil/salat.png',
      color: 'green',
      cartImgSrc: '/images/cart/cartSalatIImage.png',
    },
    {
      id: 2,
      title: 'Масло “Итальянское”',
      text: 'Добавит ноток Италии в любое ваше блюдо. Паста, ризотто, пицца, салаты - его везде можно использовать.',
      ingridients:
        'Состав: оливковое масло холодного отжима, чеснок, вяленые томаты, базилик, орегано, майоран, смесь перцев.',
      price: 115,
      imgSrc: '/images/oil/italy.png',
      color: 'emerald',
      cartImgSrc: '/images/cart/cartItalyImage.png',
    },
    {
      id: 3,
      title: 'Масло “Для мяса”',
      text: 'Идеальное решение для легкого и быстрого маринада мяса, можно добавить капельку масла и после приготовления.',
      ingridients:
        'Состав: оливковое масло холодного отжима, чеснок, паприку, кориандр, смесь перцев, розмарин, тимьян, перец чили.',
      price: 115,
      imgSrc: '/images/oil/meat.png',
      color: 'red',
      cartImgSrc: '/images/cart/cartMeatImage.png',
    },
    {
      id: 4,
      title: 'Масло “Восточное”',
      text: 'Oтлично подойдёт для блюд среднеазиатской кухни: шурпа, плов, лагман с этим маслом приобретут традиционные нотки Средней Азии.',
      ingridients:
        'Состав: оливковое масло холодного отжима, перец чили, зира, куркума, чеснок, смесь перцев.',
      price: 115,
      imgSrc: '/images/oil/vostochnoe.png',
      color: 'orange',
      cartImgSrc: '/images/cart/cartVostochnoeImage.png',
    },
  ];

  return (
    <section className={styles.oil} id='oil'>
      <div className="oil__container container">
        <h2 className={styles.titleSection}>Масло</h2>
        <ul className={styles.items}>
          {!isSliderWidth &&
            products.map((product, index) => (
              <OilCard {...product} index={index} key={index} />
            ))}
          {isSliderWidth && (
            <Swiper
              slidesPerView={2}
              loop={true}
              spaceBetween={20}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                580: { slidesPerView: 2 },
              }}
            >
              {products.map((product, index) => (
                <SwiperSlide>
                  <div className={styles.sliderWrapper}>
                    <OilCard {...product} index={index} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div
            className={classNames('swiper-pagination', styles.pagination)}
          ></div>
        </ul>
      </div>
    </section>
  );
};

export default Oil;
