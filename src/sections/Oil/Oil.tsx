import styles from './Oil.module.scss';
import {FC} from 'react';
import OilCard from './OilCard';
import {useMatchMedia} from '../../Hooks/useMatchMedia';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import classNames from 'classnames';
import {useAppSelector} from '@/Hooks/hooks';
import Skeleton from '@/components/Skeleton/Skeleton';

const Oil: FC = () => {
	const isSliderWidth: boolean = useMatchMedia('(max-width: 1050px)');
	const {items, status} = useAppSelector((state) => state.items);
	const sceletonArray = [...Array(4)];

	return (
		<section
			className={styles.oil}
			id="oil"
			aria-labelledby='oil-title'
		>
			<div
				className="oil__container container"

			>
				<h2
					className={styles.titleSection}
					id="oil-title"
				>Масло
				</h2>
				<div className={styles.items}>
					{status === 'pending' && !isSliderWidth &&
						sceletonArray.map((_, i) => <Skeleton key={i} />)}
					{status === 'fulfilled' &&
						!isSliderWidth &&
						items.map((item, index) => (
							<div key={item.id}>
								<OilCard
									{...item}
									index={index}
								/>
							</div>
						))}
					{isSliderWidth && (
						<>
							<Swiper
								role='region'
								aria-roledescription='carousel'
								aria-label='Oils list'
								aria-live='polite'
								slidesPerView={2}
								loop={true}
								spaceBetween={20}
								modules={[Pagination]}
								pagination={{
									clickable: true,
									el: '.swiper-pagination',
								}}
								breakpoints={{
									0: {slidesPerView: 1},
									580: {slidesPerView: 2},
								}}
							>
								{items.map((item, index) => (

									<SwiperSlide
										key={item.id}
										role='group'
										aria-roledescription='slide'
										aria-label={`${index + 1} of ${items.length}`}

									>
										<div className={styles.sliderWrapper}>
											<OilCard {...item} index={index} />
										</div>
									</SwiperSlide>
								))}
							</Swiper>
							<div
								className={classNames('swiper-pagination', styles.pagination)}
							></div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default Oil;
