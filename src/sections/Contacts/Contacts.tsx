import { FC } from 'react';
import styles from './Contacts.module.scss';
import MyIcon from '../../components/MyIcon/MyIcon';
import Button from '../../components/Button/Button';
import { useAppSelector, useAppDispatch } from '@/Hooks/hooks';
import { msgModalToggle } from '@/redux/messageSlice';

type ContactsIcons =
  | 'phoneIcon'
  | 'facebookIcon'
  | 'instagramIcon'
  | 'telegramIcon'
  | 'viberIcon';

export type Contact = {
  name: string;
  value: string;
  label: string;
  href: string;
  icon: ContactsIcons;
};

const Contacts: FC = () => {
  const dispatch = useAppDispatch()
  const contacts: Contact[] = [
    {
      name: 'phone',
      value: '+38 (066) 11-43-558',
      label: 'phone link',
      href: 'tel: +380661143558',
      icon: 'phoneIcon',
    },
    {
      name: 'facebook',
      value: 'https://www.facebook.com/r.olio8/',
      label: 'facebook link',
      href: 'https://www.facebook.com',
      icon: 'facebookIcon',
    },
    {
      name: 'instagram',
      value: 'https://www.instagram.com/r.olio_/',
      label: 'instagram link',
      href: 'https://www.instagram.com',
      icon: 'instagramIcon',
    },
    {
      name: 'telegram',
      value: 'https://t.me/r_olio',
      label: 'telegram link',
      href: 'https://t.me/r_olio',
      icon: 'telegramIcon',
    },
    {
      name: 'viber',
      value: '+38 (066) 11-43-558',
      label: 'viber link',
      href: 'tel:3806611-43-558',
      icon: 'viberIcon',
    },
  ];

  return (
    <section className={styles.contacts} aria-labelledby="contacts-title" id='contacts'>
      <div className="container">
        <h2 className={styles.title} id="contacts-title">
          Контакты
        </h2>
        <div className={styles.inner}>
          <div className={styles.image}>
            <img
              src="/images/contacts/contscts-img.jpg"
              alt=""
              width="740"
              height="472"
              loading="lazy"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.items}>
              {contacts.map((el) => (
                <a
                  className={styles.item}
                  href={el.href}
                  target="_blanc"
                  key={el.name}
                >
                  <MyIcon
                    className={styles.itemIcon}
                    name={el.icon}
                    width="32"
                    height="32"
                    label={el.label}
                  />
                  {el.value}
                </a>
              ))}
              <Button
                title="НАПИСАТЬ НАМ"
                color="green"
                className={styles.messsageBtn}
                onClick={() => {
                  dispatch(msgModalToggle())
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
