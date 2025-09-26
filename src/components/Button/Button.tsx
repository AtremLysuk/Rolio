import { FC } from 'react';
import './Button.scss';

import classNames from 'classnames';

type ButtonProps = {
  className: string;
  color?: string;
  title: string;
  href?: string;

};

const Button: FC<ButtonProps> = ({ color, title, className, href }) => {
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      type={href ? undefined : 'button'}
      className={classNames(className, 'button', color && `button--${color}`)}
    >
      {title}
    </Tag>
  );
};

export default Button;
