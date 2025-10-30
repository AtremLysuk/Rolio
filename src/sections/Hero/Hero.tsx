import { Swiper, SwiperSlide } from 'swiper/react';
import type { ItemImages } from '@/redux/itemsSlice';
import 'swiper/css';
import './Hero.scss';
import { Pagination } from 'swiper/modules';
import HeroItem from '../../components/HeroItem/HeroItem';
import { useState, useRef, useEffect } from 'react';

import { fetchItems } from '@/redux/itemsSlice';
import { useAppDispatch, useAppSelector } from '@/Hooks/hooks';

type TImages = ItemImages;

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
  const dispatch = useAppDispatch();
  const swiperRef = useRef<any | null>(null);

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const { items, error, status } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  console.log(items);
  return (
    <section className="hero">
      <div className="hero__container container">
        <div className="hero__inner">
          {status === 'pending' && (
            <div className="hero__spinner">
              <h2>...loading</h2>
            </div>
          )}
          {status === 'fulfilled' && (
            <div className="hero__slider">
              <Swiper
                slidesPerView={1}
                slidesPerGroup={1}
                modules={[Pagination]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
              >
                {items.map((slide, index) => (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
