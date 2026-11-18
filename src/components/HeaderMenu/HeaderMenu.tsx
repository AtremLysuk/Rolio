import {Dispatch, FC, SetStateAction, useEffect} from 'react';
import classNames from 'classnames';
import {useLenis} from 'lenis/react';
import styles from './HeaderMenu.module.scss';
import type {MenuLinksType} from '../../sections/Header/headerLinks';

interface HeaderMenuProps {
	links: MenuLinksType[];
	isBurgerActive: boolean;
	setIsBurgerActive: Dispatch<SetStateAction<boolean>>;
}

const HeaderMenu: FC<HeaderMenuProps> = ({links, isBurgerActive, setIsBurgerActive}) => {
	const lenis = useLenis();

	// Пока меню открыто, страница под ним не скроллится
	useEffect(() => {
		if (!lenis) return;

		if (isBurgerActive) {
			lenis.stop();
		} else {
			lenis.start();
		}
	}, [lenis, isBurgerActive]);

	// Escape закрывает меню
	useEffect(() => {
		if (!isBurgerActive) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsBurgerActive(false);
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isBurgerActive, setIsBurgerActive]);

	return (
		<div
			className={classNames(styles.menuBurgerWrapper, {
				[styles.active]: isBurgerActive,
			})}
			inert={!isBurgerActive}
		>
			<nav
				className={styles.menuBurger}
				aria-label="Мобильное меню"
			>
				<ul className={styles.menuList}>
					{links.map((el) => (
						<li
							className={styles.menuItem}
							key={el.title}
						>
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
