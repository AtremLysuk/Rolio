import classNames from 'classnames';
import styles from './About.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { FC, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);
interface IAboutItems {
  subtitle: string;
  text: string;
  imgSrc: string;
}

const About: FC = () => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const aboutItems: IAboutItems[] = [
    {
      subtitle: 'Кто мы',
      text: 'Мы пара: Таня и Рома и мы создатели пряного оливкового масла R.olio. Предыстория:Так сложилось в нашей паре, что готовит у нас Рома, он очень увлечен кулинарией и каждый раз придумывает что-то новенькое.Накануне прошлого Нового года, мы готовили подарки нашим друзьям и родственникам. Нам захотелось к подаркам добавить что-то необычное, от себя.И к нам пришла идея, Рома готовил вкуснейшее пряное оливковое масло для своих рецептов, добавлял розмарин, тимьян, чеснок, разные виды перцев...каждый раз получался новый неповторимый вкус.',
      imgSrc: '/images/about/people.jpg',
    },
    {
      subtitle: 'Что мы делаем',
      text: 'И мы решили сделать такое масло, как добавление к подарку. Надо сказать, что наши близкие оценили презент и просили снова и снова сделать им такое масло.И появилась идея: почему бы не попробовать запустить такое масло в продажуРома долго выверял рецепты, я разрабатывала дизайн этикеток и искала поставщиков. И вот мы готовы представить его вам!Мы старались сделать наше масло максимально доступным, при этом не потеряв в качестве. Стоимость бутылки(250мл) - всего 115грн.',
      imgSrc: '/images/about/fruits.jpg',
    },
  ];

  useGSAP(() => {
    const splits: SplitText[] = [];
    let isActive = true;
    document.fonts.ready.then(() => {
      if (!isActive) return;
      const textArray = gsap.utils.toArray<HTMLElement>('[data-text]');

      textArray.forEach((el) => {
        const split = new SplitText(el, { type: 'lines' });
        splits.push(split);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        });

        tl.fromTo(
          split.lines,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );
      });
    });
    return () => {
      isActive = false;
      splits.forEach((el) => {
        el.revert();
      });
    };
  }, []);

  return (
    <section
      className={styles.about}
      id="about"
      aria-labelledby="about-title"
      ref={containerRef}
    >
      <div className="about__container container">
        <h2 className={styles.title} id="about-title">
          О нас
        </h2>
        <div className={styles.items}>
          {aboutItems.map((item, index) => (
            <div
              className={classNames(
                styles.item,
                index % 2 === 0 ? styles['item--left'] : styles['item--right']
              )}
              key={item.subtitle}
            >
              <div className={styles.image}>
                <img
                  src={item.imgSrc}
                  alt=""
                  width={433}
                  height={314}
                  loading="lazy"
                />
              </div>
              <div
                className={classNames(
                  styles.content,
                  index % 2 === 0 && index === 0
                    ? styles['content--right']
                    : styles['content--left']
                )}
              >
                <h4 className={styles.contentTitle}>{item.subtitle}</h4>
                <div className={styles.contentText} data-text>
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
