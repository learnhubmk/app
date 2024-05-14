'use client';

import React from 'react';
import style from './PerkCards.module.scss';
import PerkCardsData from './PerkCardsData';
import PerkCard from '../../reusable-components/perk-card/PerkCard';
import { useTheme } from '../../../app/context/themeContext';

export interface PerkCardsDataProps {
  id?: number;
  perkCardText: string;
  perkCardIcon: string;
}
const PerkCards = () => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';

  return (
    <div
      className={`${style.perkCardsWrapper}  ${lightTheme ? style.perkContainerLight : style.perkContainerDark}`}
    >
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
