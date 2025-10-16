import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Pagination } from 'swiper/modules';
import HeroItem from '../../components/HeroItem/HeroItem';
import { useState, useRef } from 'react';

type TImages = {
  title: string;
  imgSrc: string;
  width: number;
  height: number;
};

export type Color = 'green' | 'red' | 'orange' | 'emerald';

export type TSlideData = {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  images: TImages[];
  color: Color;
  cartImgSrc: string;
  price: number;
  slideHandler?: (index: number) => void;
};

const Hero: React.FC = () => {
  const swiperRef = useRef<any | null>(null);

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const slidesData: TSlideData[] = [
    {
      id: 1,
      title: 'Масло “Для салата”',
      subtitle: 'Наши продукты',
      text: 'Название говорит само за себя. Это идеальная заправка, которая даже скучной и привычной капусте придаст неповторимый вкус и аромат.',
      images: [
        {
          title: 'bottle',
          imgSrc: '/images/hero/salat/bottle.png',
          width: 136,
          height: 648,
        },
        {
          title: 'bg',
          imgSrc: '/images/hero/salat/salatbg.png',
          width: 557,
          height: 557,
        },
        {
          title: 'delicius',
          imgSrc: '/images/hero/salat/tomato.png',
          width: 260,
          height: 267,
        },
      ],
      cartImgSrc: '/images/cart/cartSalatIImage.png',
      color: 'green',
      price: 125,
    },
    {
      id: 2,
      title: 'Масло “Итальянское”',
      subtitle: 'Наши продукты',
      text: 'Идеальное решение для легкого и быстрого маринада мяса, можно добавить капельку масла и после приготовления.',
      images: [
        {
          title: 'bottle',
          imgSrc: '/images/hero/italy/bottle.png',
          width: 136,
          height: 648,
        },
        {
          title: 'bg',
          imgSrc: '/images/hero/italy/bg.png',
          width: 557,
          height: 557,
        },
        {
          title: 'delicius',
          imgSrc: '/images/hero/italy/spagetti.png',
          width: 300,
          height: 300,
        },
      ],
      cartImgSrc: '/images/cart/cartItalyImage.png',
      color: 'emerald',
      price: 125,
    },
    {
      id: 3,
      title: 'Масло “Для мяса”',
      subtitle: 'Наши продукты',
      text: 'Идеальное решение для легкого и быстрого маринада мяса, можно добавить капельку масла и после приготовления.',
      images: [
        {
          title: 'bottle',
          imgSrc: '/images/hero/meat/bottlemeat.png',
          width: 136,
          height: 648,
        },
        {
          title: 'bg',
          imgSrc: '/images/hero/meat/meatbg.png',
          width: 557,
          height: 557,
        },
        {
          title: 'delicius',
          imgSrc: '/images/hero/meat/meat.png',
          width: 300,
          height: 300,
        },
      ],
      cartImgSrc: '/images/cart/cartMeatImage.png',
      color: 'red',
      price: 125,
    },
    {
      id: 4,
      title: 'Масло “Восточное”',
      subtitle: 'Наши продукты',
      text: 'Идеальное решение для легкого и быстрого маринада мяса, можно добавить капельку масла и после приготовления.',
      images: [
        {
          title: 'bottle',
          imgSrc: '/images/hero/vostochnoe/vostochnoebottle.png',
          width: 136,
          height: 648,
        },
        {
          title: 'bg',
          imgSrc: '/images/hero/vostochnoe/vostochnoebg.png',
          width: 557,
          height: 557,
        },
        {
          title: 'delicius',
          imgSrc: 'images/hero/vostochnoe/rice.png',
          width: 300,
          height: 300,
        },
      ],
      cartImgSrc: '/images/cart/cartVostochnoeImage.png',
      color: 'orange',
      price: 125,
    },
  ];

  return (
    <section className="hero">
      <div className="hero__container container">
        <div className="hero__inner">
          <div className="hero__slider">
            <Swiper
              slidesPerView={1}
              slidesPerGroup={1}
              modules={[Pagination]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            >
              {slidesData.map((slide, index) => (
                <SwiperSlide key={slide.title}>
                  <HeroItem
                    {...slide}
                    index={index}
                    isActive={activeSlide === index}
                    slideHandler={(index: number) => {
                      setActiveSlide(index);
                      swiperRef.current?.slideTo(index);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
