import React from 'react';
import style from './PerkCards.module.scss';
import PerkCardsData from './PerkCardsData';
import PerkCard from '../../reusable-components/perk-card/PerkCard';

export interface PerkCardsDataProps {
  id?: number;
  perkCardText: string;
  perkCardIcon: string;
}
const PerkCards = () => {
  return (
    <div className={style.perkCardsWrapper}>
      <div className={style.perkCardsInner}>
        {PerkCardsData.map((perkCardDataItem: PerkCardsDataProps) => (
          <PerkCard
            key={perkCardDataItem.id}
            perkCardText={perkCardDataItem.perkCardText}
            perkCardIcon={perkCardDataItem.perkCardIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default PerkCards;
