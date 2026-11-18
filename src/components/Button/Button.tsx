import {FC} from 'react';
import classNames from 'classnames';
import './Button.scss';

type ButtonProps = {
	className?: string;
	color?: string;
	title?: string;
	href?: string;
	ariaLabel?: string;
	disabled?: boolean;
	onClick?: () => void;
};

const Button: FC<ButtonProps> = ({
	color,
	title,
	className,
	href,
	ariaLabel,
	disabled,
	onClick,
}) => {
	const classes = classNames(className, 'button', color && `button--${color}`);

	if (href) {
		// Внешние ссылки открываются в новой вкладке, якоря на странице — в той же
		const isExternal = /^https?:\/\//.test(href);

		return (
			<a
				href={href}
				className={classes}
				aria-label={ariaLabel}
				{...(isExternal && {target: '_blank', rel: 'noopener noreferrer'})}
			>
				{title}
			</a>
		);
	}

	return (
		<button
			type="button"
			className={classes}
			aria-label={ariaLabel}
			disabled={disabled}
			onClick={onClick}
		>
			{title}
		</button>
	);
};

export default Button;
