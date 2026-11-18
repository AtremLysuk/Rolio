import {FC, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import './HeroItem.scss';
import Button from '../Button/Button';
import {useMatchMedia} from '../../Hooks/useMatchMedia';
import {useAppDispatch} from '../../Hooks/hooks';
import {addItem} from '../../redux/cartSlice';
import type {Color, TSlideData} from '../../sections/Hero/Hero';

type HeroItemProps = TSlideData & {
	isActive: boolean;
	onColorSelect: (color: Color) => void;
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
	onColorSelect,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const countRef = useRef<HTMLSpanElement | null>(null);
	const tlRef = useRef<gsap.core.Timeline | null>(null);
	const dispatch = useAppDispatch();

	const [itemCount, setItemCount] = useState(0);
	const isLaptopWidth = useMatchMedia('(max-width: 900px)');

	// Анимация появления картинок слайда; запускается, когда слайд становится активным
	useGSAP(
		() => {
			const tl = gsap.timeline({paused: true, defaults: {ease: 'power3.out'}});

			tl.fromTo('.slide-images__bg', {opacity: 0, scale: 0.2}, {opacity: 1, scale: 1, duration: 0.6})
				.fromTo(
					'.slide-images__bottle',
					{yPercent: 20, opacity: 0},
					{yPercent: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)'},
					'-=0.3'
				)
				.fromTo(
					'.slide-images__delicius',
					{xPercent: -20, opacity: 0},
					{xPercent: 0, opacity: 1, duration: 0.7},
					0.8
				);

			tlRef.current = tl;
		},
		{scope: containerRef}
	);

	useGSAP(
		() => {
			gsap.fromTo(
				countRef.current,
				{scale: 1.4, opacity: 0, y: -10},
				{scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(2)'}
			);
		},
		{dependencies: [itemCount]}
	);

	useEffect(() => {
		if (!tlRef.current) return;

		if (isActive) {
			gsap.set(containerRef.current, {opacity: 1});
			tlRef.current.restart();
		} else {
			tlRef.current.pause(0);
			gsap.set(containerRef.current, {opacity: 0});
		}
	}, [isActive]);

	const handleAddToCart = () => {
		dispatch(addItem({id, title, price, cartImgSrc, count: itemCount}));
		setItemCount(0);
	};

	const sliderHeader = (
		<SliderHeader
			subtitle={subtitle}
			color={color}
			onColorSelect={onColorSelect}
		/>
	);

	return (
		<div
			className={classNames('hero-slide__wrapper', {active: isActive})}
			ref={containerRef}
			inert={!isActive}
		>
			{isLaptopWidth && sliderHeader}

			<div className="hero-slide__images slide-images">
				<div className="slide-images__group">
					{images.map((image) => (
						<img
							className={`slide-images__${image.title}`}
							src={image.imgSrc}
							alt={image.title === 'bottle' ? title : ''}
							width={image.width}
							height={image.height}
							loading={isActive ? 'eager' : 'lazy'}
							key={image.title}
						/>
					))}
				</div>
			</div>

			<div className="hero-slide__content">
				{!isLaptopWidth && sliderHeader}

				<div className="slide-body">
					<h2 className="slide-body__title h1">{title}</h2>

					<div className="slide-body__text">
						<p>{text}</p>
					</div>

					<div className="slide-body__count body-count">
						<button
							type="button"
							className="body-count__minus"
							aria-label={`Уменьшить количество: ${title}`}
							disabled={itemCount < 1}
							onClick={() => setItemCount((prev) => prev - 1)}
						>
							-
						</button>
						<span
							className="body-count__value"
							ref={countRef}
						>
							{itemCount}
						</span>
						<button
							type="button"
							className="body-count__plus"
							aria-label={`Увеличить количество: ${title}`}
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
							href="#oil"
							ariaLabel={`Подробнее о товаре: ${title}`}
						/>
						<Button
							className="body-buttons-add"
							title="В КОРЗИНУ"
							color={color}
							ariaLabel={`Добавить в корзину: ${title}`}
							disabled={itemCount === 0}
							onClick={handleAddToCart}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroItem;

// ---------------- SliderHeader ----------------

type SliderLink = {
	title: string;
	color: Color;
};

const SLIDER_LINKS: SliderLink[] = [
	{title: 'Для салата', color: 'green'},
	{title: 'Итальянское', color: 'emerald'},
	{title: 'Для мяса', color: 'red'},
	{title: 'Восточное', color: 'orange'},
];

type SliderHeaderProps = {
	subtitle: string;
	color: Color;
	onColorSelect: (color: Color) => void;
};

const SliderHeader: FC<SliderHeaderProps> = ({subtitle, color, onColorSelect}) => (
	<header className="slide__header">
		<p className={classNames('slide__header-title', `slide__header-title--${color}`)}>
			{subtitle}
		</p>

		<nav
			className="slide__header-links header-links"
			aria-label="Выбор масла"
		>
			<ul>
				{SLIDER_LINKS.map((link) => (
					<li
						className="header-links__item"
						key={link.color}
					>
						<button
							type="button"
							className={classNames(
								'header-links__link',
								`header-links__link--${link.color}`,
								{active: color === link.color}
							)}
							aria-pressed={color === link.color}
							onClick={() => onColorSelect(link.color)}
						>
							{link.title}
						</button>
					</li>
				))}
			</ul>
		</nav>
	</header>
);
