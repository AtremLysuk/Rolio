import { FC } from 'react';
import './Button.scss';

import classNames from 'classnames';

type ButtonProps = {
  className?: string;
  color?: string;
  title?: string;
  href?: string;

  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({
  color,
  title,
  className,
  href,
  onClick,
}) => {
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      target="_blanc"
      type={href ? undefined : 'button'}
      href={href}
      className={classNames(className, 'button', color && `button--${color}`)}
      onClick={onClick}
    >
      {title}
    </Tag>
  );
};

export default Button;
