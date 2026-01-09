import {Swiper, SwiperSlide} from 'swiper/react';
import type {ItemImages} from '@/redux/itemsSlice';
import React from "react";
import 'swiper/css';
import './Hero.scss';
import {Pagination} from 'swiper/modules';
import HeroItem from '../../components/HeroItem/HeroItem';
import {useState, useRef, useEffect} from 'react';

import {fetchItems} from '@/redux/itemsSlice';
import {useAppDispatch, useAppSelector} from '@/Hooks/hooks';

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
	slideHandlerbyColor?: (color: Color) => void;
	index?: number;
};

const Hero: React.FC = () => {
	const dispatch = useAppDispatch();
	const swiperRef = useRef<any | null>(null);
	const activeSlideRef = useRef<HTMLElement | null>(null)

	const [activeSlide, setActiveSlide] = useState<number>(0);

	const {items, status} = useAppSelector((state) => state.items);

	useEffect(() => {
		dispatch(fetchItems());
	}, [dispatch]);

	return (
		<section
			className="hero"
			aria-labelledby='hero-title'
		>
			<div className="hero__container container">
				<h1
					id="hero-title"
					className="visually-hidden"
				>
					Каталог товаров
				</h1>
				<div className="hero__inner">
					{status === 'pending' && (
						<div
							className="hero__spinner"
							aria-live='polite'
							aria-busy={status === 'pending'}
						>
							<p>...loading</p>
						</div>
					)}
					{status === 'rejected' && (
						<p role="alert">Ошибка загрузки товаров</p>
					)}
					{status === 'fulfilled' && (
						<div className="hero__slider">
							<Swiper
								role='region'
								aria-roledescription='carousel'
								aria-label='Слайдер товаров'
								slidesPerView={1}
								slidesPerGroup={1}
								modules={[Pagination]}
								onSwiper={(swiper) => (swiperRef.current = swiper)}
								onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
							>
								{items.map((slide, index) => (
									<SwiperSlide
										key={slide.id}
										role='group'
										aria-roledescription='slide'
										aria-label={`${index + 1} из ${items.length}`}
									>
										<HeroItem
											setActiveRef={(el) => {
												if (activeSlide === index) {
													activeSlideRef.current = el
												}
											}}

											{...slide}
											key={slide.id}
											isActive={activeSlide === index}

											slideHandlerbyColor={(color: string) => {
												const targetIndex = items.findIndex((el) => el.color === color)
												if (targetIndex !== -1) {
													setActiveSlide(targetIndex);
													swiperRef.current?.slideTo(targetIndex);
												}

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
