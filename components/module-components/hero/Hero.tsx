'use client';

import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useTheme } from '../../../app/context/themeContext';
import Button from '../../reusable-components/button/Button';
import HeroImageDesktop from '../../../public/hero-pictures/hero-picture.png';
import HeroImageMobile from '../../../public/hero-pictures/hero-picture-mobile.png';

import style from './hero.module.scss';

interface HeroProps {
  title: string;
  text: string;
}

const Hero = ({ title, text }: HeroProps) => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  return (
    <section
      className={`${style.heroSection} ${isLightTheme ? style.lightHeroSection : style.darkHeroSection}`}
    >
      <div className={style.hero}>
        <div className={style.heroLeftContainer}>
          <h1 className={`${isLightTheme ? style.lightThemeHeroTitle : style.darkThemeHeroTitle}`}>
            {title}
          </h1>
          <p
            className={`${style.heroText} ${isLightTheme ? style.lightThemeHeroText : style.darkThemeHeroText}`}
          >
            {text}
          </p>
          <Link href="https://discord.com/invite/nUEKUWVveW" target="_blank">
            <Button
              href=""
              type="button"
              buttonText="Придружи ни се"
              buttonClass={['primaryButton', 'buttonWithIcon']}
              iconSrc="/icons/right-arrow.svg"
              moveIcon
            />
          </Link>
        </div>
        <div className={style.heroPictureContainer}>
          <Image
            src={HeroImageDesktop}
            className={`${style.heroImage} ${style.desktop}`}
            alt="hero picture desktop"
            priority
          />
          <Image
            src={HeroImageMobile}
            className={`${style.heroImage} ${style.mobile}`}
            alt="hero picture mobile"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
