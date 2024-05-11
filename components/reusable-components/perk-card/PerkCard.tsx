import React from 'react';
import Image from 'next/image';
import style from './PerkCard.module.scss';

export interface PerkCardsDataProps {
  perkCardText: string;
  perkCardIcon: string;
}

const PerkCard = ({ perkCardText, perkCardIcon }: PerkCardsDataProps) => {
  return (
    <div className={style.perkCardWrapper}>
      <div className={style.perkCardInner}>
        <div className={style.perkCardIcon}>
          <Image src={perkCardIcon} alt="icon" width={56} height={56} />
        </div>
        <p className={style.perkCardTextContent}>{perkCardText}</p>
      </div>
    </div>
  );
};

export default PerkCard;
