import React from 'react';
import style from './PerkCard.module.scss';

interface Props {
  perkCardText: string;
  perkCardIcon: any;
}
const PerkCard = ({ perkCardText, perkCardIcon }: Props) => {
  return (
    <div className={style.perkCardWrapper}>
      <div className={style.perkCardInner}>
        <div className={style.perkCardIcon}>
          <img src={perkCardIcon} alt="icon" />
        </div>
        <p className={style.perkCardTextContent}>{perkCardText}</p>
      </div>
    </div>
  );
};

export default PerkCard;
