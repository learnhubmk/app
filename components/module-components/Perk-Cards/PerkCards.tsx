import React from 'react';
import PerkCard, { PerkCardsData } from '../../reusable-components/perk-card/PerkCard';
import style from './PerkCards.module.scss';

interface PerkCardsProps {
  data: PerkCardsData[];
}
const PerkCards = ({ data }: PerkCardsProps) => {
  return (
    <div className={style.perkCardsWrapper}>
      <div className={style.perkCardsInner}>
        {data.map((perkCardData) => (
          <PerkCard
            id={perkCardData.id}
            perkCardText={perkCardData.perkCardText}
            perkCardIcon={perkCardData.perkCardIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default PerkCards;
