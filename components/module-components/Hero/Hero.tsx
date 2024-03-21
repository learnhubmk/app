/* eslint-disable react/button-has-type */

'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import style from './hero.module.scss';
import { useTheme } from '../../context/ThemeContext';

interface HeroProps {
  title: string;
  headline: string;
  text: string;
}

const Hero = ({ title, headline, text }: HeroProps) => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);
  console.log(toggleTheme);
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div className={style.hero}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div className={style.heroLeftContainer}>
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
