import { FC, useEffect } from 'react';
import styles from './HeaderMenu.module.scss';
import classNames from 'classnames';
import type { MenuLinksType } from '../../sections/Header/Header';
import { useLenis } from 'lenis/react';

interface HeaderMenuProps {
  links: MenuLinksType[];
  isBurgerActive: boolean;
  setIsBurgerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderMenu: FC<HeaderMenuProps> = ({
  links,
  isBurgerActive,
  setIsBurgerActive,
}) => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (isBurgerActive) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isBurgerActive]);

  return (
    <div
      className={classNames(styles.menuBurgerWrapper, {
        [styles.active]: isBurgerActive,
      })}
    >
      <nav className={styles.menuBurger}>
        <ul className={styles.menuList}>
          {links.map((el) => (
            <li className={styles.menuItem} key={el.title}>
              <a
                className={styles.menuLink}
                href={el.path}
                onClick={() => setIsBurgerActive(false)}
              >
                {el.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderMenu;
