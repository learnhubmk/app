import React from 'react';
import Image from 'next/image';
import style from './PerkCard.module.scss';
import { PerkCardsDataProps } from '../../module-components/perk-cards/PerkCards';
import { useTheme } from '../../../app/context/themeContext';

const PerkCard = ({ perkCardText, perkCardIcon }: PerkCardsDataProps) => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';
  return (
    <div className={style.perkCardWrapper}>
      <div
        className={`${style.perkCardInner} ${lightTheme ? style.perkCardLight : style.perkCardDark}`}
      >
        <div className={style.perkCardIcon}>
          <Image src={perkCardIcon} alt="icon" className={style.icon} width={56} height={56} />
        </div>
        <p className={style.perkCardTextContent}>{perkCardText}</p>
      </div>
    </div>
  );
};

export default PerkCard;
