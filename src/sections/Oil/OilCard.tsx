import {FC, useState, useRef} from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import Button from '../../components/Button/Button';
import styles from './OilCard.module.scss';
import {addItem} from '../../redux/cartSlice';
import {useAppDispatch} from '../../Hooks/hooks';
import type {ItemType} from '@/redux/itemsSlice';

interface OilCardProps extends ItemType {
	index?: number;
	imgSrc?: string;
}

const OilCard: FC<OilCardProps> = ({
	id,
	imgSrc,
	index,
	color,
	title,
	text,
	price,
	cartImgSrc,
}) => {
	const [productCount, setProductCount] = useState<number>(0);
	const dispatch = useAppDispatch();
	const itemCountRef = useRef<HTMLSpanElement | null>(null);

	useGSAP(
		() => {
			if (!itemCountRef.current) return;

			gsap.fromTo(
				itemCountRef.current,
				{scale: 1.4, opacity: 0, y: -10},
				{scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(2)'}
			);
		},
		{dependencies: [productCount]}
	);

	const handleAddToCart = () => {
		dispatch(
			addItem({
				id,
				title,
				price,
				cartImgSrc,
				count: productCount,
			})
		);
		setProductCount(0);
	};

	return (
		<article className={styles.card}>
			<div className={styles.image}>
				<img
					src={imgSrc}
					alt={title}
					className={index === 0 ? styles.firstFoto : ''}
					width={68}
					height={230}
					loading="lazy"
				/>
			</div>

			<div className={styles.inner}>
				<h5 className={classNames(styles.title, styles[`title--${color}`])}>
					{title}
				</h5>

				<p className={styles.text}>{text}</p>

				<div className={styles.footer}>
					<div className={styles.count}>
						<button
							type="button"
							className={styles.btnMinus}
							aria-label={`Уменьшить количество: ${title}`}
							disabled={productCount < 1}
							onClick={() => setProductCount((prev) => prev - 1)}
						>
							-
						</button>
						<span
							className={styles.value}
							ref={itemCountRef}
						>
							{productCount}
						</span>
						<button
							type="button"
							className={styles.btnPlus}
							aria-label={`Увеличить количество: ${title}`}
							onClick={() => setProductCount((prev) => prev + 1)}
						>
							+
						</button>
					</div>

					<p className={classNames(styles.price, styles[`price--${color}`])}>
						<span>250мл</span>
						{price} грн
					</p>

					<Button
						title="В корзину"
						ariaLabel={`Добавить в корзину: ${title}`}
						className={styles.btnAdd}
						color={color}
						disabled={productCount === 0}
						onClick={handleAddToCart}
					/>
					<Button
						href="https://web.telegram.org/a/"
						title="Заказать в ТГ"
						className={styles.btnOrder}
						color={color}
						ariaLabel={`Заказать в Telegram: ${title}`}
					/>
				</div>
			</div>
		</article>
	);
};

export default OilCard;
