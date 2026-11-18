import {FC, useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import './Hero.scss';
import HeroItem from '../../components/HeroItem/HeroItem';
import {fetchItems} from '@/redux/itemsSlice';
import type {ItemImages} from '@/redux/itemsSlice';
import {useAppDispatch, useAppSelector} from '@/Hooks/hooks';

export type Color = 'green' | 'red' | 'orange' | 'emerald';

export type TSlideData = {
	id: number;
	title: string;
	subtitle: string;
	text: string;
	images: ItemImages[];
	color: Color;
	cartImgSrc: string;
	price: number;
};

const Hero: FC = () => {
	const dispatch = useAppDispatch();
	const swiperRef = useRef<SwiperType | null>(null);
	const [activeSlide, setActiveSlide] = useState(0);
	const {items, status} = useAppSelector((state) => state.items);

	useEffect(() => {
		dispatch(fetchItems());
	}, [dispatch]);

	const handleColorSelect = (color: Color) => {
		const targetIndex = items.findIndex((el) => el.color === color);
		if (targetIndex === -1) return;

		setActiveSlide(targetIndex);
		swiperRef.current?.slideTo(targetIndex);
	};

	return (
		<section
			className="hero"
			aria-labelledby="hero-title"
		>
			<div className="hero__container container">
				<h1
					id="hero-title"
					className="visually-hidden"
				>
					R.olio — оливковое масло с травами и специями
				</h1>
				<div className="hero__inner">
					{status === 'pending' && (
						<div
							className="hero__spinner"
							role="status"
						>
							<p>Загрузка…</p>
						</div>
					)}
					{status === 'rejected' && <p role="alert">Ошибка загрузки товаров</p>}
					{status === 'fulfilled' && (
						<div className="hero__slider">
							<Swiper
								aria-roledescription="карусель"
								aria-label="Слайдер товаров"
								slidesPerView={1}
								onSwiper={(swiper) => (swiperRef.current = swiper)}
								onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
							>
								{items.map((slide, index) => (
									<SwiperSlide
										key={slide.id}
										role="group"
										aria-roledescription="слайд"
										aria-label={`${index + 1} из ${items.length}`}
									>
										<HeroItem
											{...slide}
											isActive={activeSlide === index}
											onColorSelect={handleColorSelect}
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
