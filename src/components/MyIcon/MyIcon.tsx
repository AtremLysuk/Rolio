import {FC} from 'react';
import styles from './MyIcon.module.scss';
import classNames from 'classnames';

type Tprops = {
	name: keyof typeof icons;
	label?: string;
	srcPath?: string;
	className?: string;
	width: string | number;
	height: string | number;
};
const icons = {
	closeIcon: '/images/cart/closeIcon.svg',
	logoIcon: '/images/header/logo.svg',
	newpochta: '/images/delivery/newPochta.svg',
	ucrpochta: '/images/delivery/ukrPochta.svg',
	selfdelivery: '/images/delivery/selfDelivery.svg',
	cashDelivery: '/images/delivery/cashDelivery.svg',
	privat24: '/images/delivery/privat24.svg',
	cashOnPickup: '/images/delivery/cashOnPickup.svg',
	phoneIcon: '/images/contacts/phone.svg',
	facebookIcon: '/images/contacts/facebook.svg',
	instagramIcon: '/images/contacts/instagram.svg',
	telegramIcon: '/images/contacts/telegram.svg',
	viberIcon: '/images/contacts/viber.svg',

} as const;

const MyIcon: FC<Tprops> = ({name, label, className, width, height}) => {
	const src = icons[name];
	const isDecorative = !label

	return (
		<div className={styles.iconWrapper}>
			<img
				aria-hidden={isDecorative}
				className={classNames(styles.icon, className)}
				src={src}
				alt={label ?? ''}
				width={width}
				height={height}
				loading="lazy"
			/>
		</div>
	);
};

export default MyIcon;
