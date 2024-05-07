import React from 'react';
import PerkCard from '../../reusable-components/perk-card/PerkCard';
import style from './PerkCards.module.scss';
import PerkCardsData from './PerkCardsData'; // Importing the data

const PerkCards = () => {
  console.log(PerkCardsData);
  return (
    <div className={style.perkCardsWrapper}>
      <div className={style.perkCardsInner}>
        {PerkCardsData.map((perkCardData) => (
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
