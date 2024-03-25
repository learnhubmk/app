/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import style from './hero.module.scss';
import { useTheme } from '../../context/ThemeContext';
// eslint-disable-next-line import/no-unresolved
import solImage from './sol.png';
// eslint-disable-next-line import/no-unresolved
import moonImage from './lune.png';

interface HeroProps {
  title: string;
  headline: string;
  text: string;
}

const Hero = ({ title, headline, text }: HeroProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isSun, setIsSun] = useState(true); // State to track whether it's sun or moon

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleClick = () => {
    toggleTheme(); // Toggle the theme
    setIsSun((prevIsSun) => !prevIsSun); // Toggle between sun and moon
  };

  return (
    <div className={style.hero}>
      <div className={style.heroLeftContainer}>
        <div className={`${style.BKG} ${!isSun ? style.BKGLight : style.BKGDark}`}>
          <div
            className={`${style.animate} ${!isSun ? style.moveRight : ''}`}
            onClick={handleClick}
          >
            {' '}
            {isSun ? (
              <Image src={solImage} alt="Sun" width={30} height={30} />
            ) : (
              <Image src={moonImage} alt="Moon" width={30} height={30} />
            )}
          </div>
        </div>
        <p className={`title-m ${style.heroTitle}`}>{title}</p>
        <h1 className={`display-m ${style.heroHeadline}`}>{headline}</h1>
        <p className={`headline-s ${style.heroText}`}>{text}</p>
      </div>
      <div>
        <Image width={452} height={364} src="/hero-img.png" alt="hero image" priority />
      </div>
    </div>
  );
};

export default Hero;
