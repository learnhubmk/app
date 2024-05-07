import React from 'react';
import style from './PerkCard.module.scss';

export interface PerkCardsData {
  id: number;
  perkCardText: string;
  perkCardIcon: string;
}
const PerkCard = ({ perkCardText, perkCardIcon, id }: PerkCardsData) => {
  return (
    <div className={style.perkCardWrapper}>
      <div className={style.perkCardInner} key={id}>
        <div className={style.perkCardIcon}>
          <img src={perkCardIcon} alt="icon" />
        </div>
        <p className={style.perkCardTextContent}>{perkCardText}</p>
      </div>
    </div>
  );
};

export default PerkCard;
