import {Pagination} from 'swiper/modules';
import styles from './Reviews.module.scss';
import {Swiper, SwiperSlide} from 'swiper/react';

const Reviews = () => {
	const reviewsItems: string[] = [
		'/images/reviews/1.jpg',
		'/images/reviews/2.jpg',
		'/images/reviews/3.jpg',
		'/images/reviews/1.jpg',
		'/images/reviews/2.jpg',
		'/images/reviews/3.jpg',
		'/images/reviews/1.jpg',
		'/images/reviews/2.jpg',
		'/images/reviews/3.jpg',
	];

	return (
		<section
			className={styles.reviews}
			id='reviews'
			aria-labelledby='reviews-title'
		>
			<div className="reviews__container container">
				<h2
					className={styles.title}
					id='reviews-title'
				>Отзывы
				</h2>
				<Swiper
					role='region'
					aria-roledescription='carousel'
					aria-label='Отзывы'
					slidesPerView={3}
					loop={true}
					modules={[Pagination]}
					pagination={{
						el: '.swiper__pagination',
						clickable: true,
					}}

					breakpoints={{
						0: {slidesPerView: 1},
						580: {slidesPerView: 2},
						767.98: {slidesPerView: 3},
					}}
				>
					{reviewsItems.map((item, index) => (
						<SwiperSlide
							key={index}
							aria-roledescription='slide'
							role='group'
						>
							<div className={styles.slide}>
								<img
									src={item}
									alt={`Скриншот отзыва клиента ${index + 1}`}
									width={487}
									height={669}
									loading="lazy"
								/>
							</div>
						</SwiperSlide>
					))}

				</Swiper>
				<div className='swiper__pagination'></div>
			</div>
		</section>
	);
};

export default Reviews;
