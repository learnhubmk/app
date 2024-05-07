import React from 'react';
import PerkCard from '../../reusable-components/perk-card/PerkCard';
import style from './PerkCards.module.scss';

interface PerkCardsData {
  id: number;
  perkCardText: string;
  perkCardIcon: string;
}

interface PerkCardsProps {
  data: PerkCardsData[];
}
const PerkCards = ({ data }: PerkCardsProps) => {
  return (
    <div className={style.perkCardsWrapper}>
      <div className={style.perkCardsInner}>
        {data.map((perkCardData) => (
          <PerkCard
            key={perkCardData.id}
            perkCardText={perkCardData.perkCardText}
            perkCardIcon={perkCardData.perkCardIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default PerkCards;
