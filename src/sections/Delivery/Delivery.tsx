import MyIcon from '../../components/MyIcon/MyIcon';
import styles from './Delivery.module.scss';

import { FC } from 'react';

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
    <article className={styles.delivery} id='delivery'>
      <div className="container">
        <div className={styles.deliveryItems}>
          {deliveryItems.map((item) => (
            <div className={styles.item} key={item.title}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <div className={styles.itemIcons}>
                {item.icons.map((icon) => (
                  <div className={styles.itemIconsWrapper} key={icon.title}>
                    <MyIcon
                      name={icon.name}
                      width="40"
                      height="40"
                      label={icon.label}
                    />
                    <h6 className={styles.iconTitle}>{icon.title}</h6>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Delivery;
