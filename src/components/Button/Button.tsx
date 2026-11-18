import { FC } from 'react';
import './Button.scss';

import classNames from 'classnames';

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
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
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
