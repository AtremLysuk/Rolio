import styles from './Oil.module.scss';
import { FC } from 'react';
import OilCard from './OilCard';
import { useMatchMedia } from '../../Hooks/useMatchMedia';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import classNames from 'classnames';
import { useAppSelector } from '@/Hooks/hooks';
import Skeleton from '@/components/Skeleton/Skeleton';

const Oil: FC = () => {
  const isSliderWidth: boolean = useMatchMedia('(max-width: 1050px)');
  const { items, status, error } = useAppSelector((state) => state.items);
  console.log('Oil', items);
  const sceletonArray = [...Array(4)];

  return (
    <section className={styles.oil} id="oil">
      <div className="oil__container container">
        <h2 className={styles.titleSection}>Масло</h2>
        <ul className={styles.items}>
          {status === 'pending' && !isSliderWidth &&
            sceletonArray.map((_, i) => <Skeleton key={i} />)}
          {status === 'fulfilled' &&
            !isSliderWidth &&
            items.map((item, index) => (
              <OilCard {...item} index={index} key={index} />
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
              {items.map((item, index) => (
                <SwiperSlide>
                  <div className={styles.sliderWrapper}>
                    <OilCard {...item} index={index} />
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
