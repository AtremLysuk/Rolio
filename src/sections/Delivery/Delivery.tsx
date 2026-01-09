import MyIcon from '../../components/MyIcon/MyIcon';
import styles from './Delivery.module.scss';

import {FC} from 'react';

type IconNames =
	| 'newpochta'
	| 'ucrpochta'
	| 'selfdelivery'
	| 'cashDelivery'
	| 'privat24'
	| 'cashOnPickup';

interface Icons {
	name: IconNames;
	title: string;
	label: string;
}

type DeliveryItems = {
	title: string;
	icons: Icons[];
};

const Delivery: FC = () => {
	const deliveryItems: DeliveryItems[] = [
		{
			title: 'Доставка',
			icons: [
				{
					name: 'newpochta',
					title: 'Новая почта',
					label: 'Новая почта icon',
				},
				{
					name: 'ucrpochta',
					title: 'Укрпочта',
					label: 'Укрпочта icon',
				},
				{
					name: 'selfdelivery',
					title: 'Самовывоз',
					label: 'Самовывоз icon',
				},
			],
		},
		{
			title: 'Оплата',
			icons: [
				{
					name: 'cashDelivery',
					title: 'Наложенный платёж',
					label: 'cashDelivery icon',
				},
				{
					name: 'privat24',
					title: 'Приват24',
					label: 'Приват24 icon',
				},
				{
					name: 'cashOnPickup',
					title: 'Наличными при самовывозе',
					label: 'Cash on pickup icon',
				},
			],
		},
	];

	return (
		<section
			className={styles.delivery}
			id='delivery'
			aria-labelledby='delivery-title'
		>
			<div className="container">
				<h2
					className='visually-hidden'
					id='delivery-title'
				>Delivery&Payment
				</h2>
				<ul className={styles.deliveryItems}>
					{deliveryItems.map((item) => (
						<li
							className={styles.item}
							key={item.title}
						>
							<h3 className={styles.itemTitle}>{item.title}</h3>
							<ul className={styles.itemIcons}>
								{item.icons.map((icon) => (
									<li
										className={styles.itemIconsWrapper}
										key={icon.name}
									>
										<MyIcon
											name={icon.name}
											width="40"
											height="40"
											label={icon.label}
										/>
										<span className={styles.iconTitle}>{icon.title}</span>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default Delivery;
