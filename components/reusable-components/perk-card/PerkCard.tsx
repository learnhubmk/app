import React from 'react';
import style from './PerkCard.module.scss';

interface Props {
  text: string;
  icon: any;
}
const PerkCard = ({ text, icon }: Props) => {
  return (
    <div className={style.cardWrapper}>
      <div className={style.card}>
        <div className={style.icon}>{icon}</div>
        <p className={style.text}>{text}</p>
      </div>
    </div>
  );
};

export default PerkCard;
