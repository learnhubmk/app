'use client';

import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useTheme } from '../../../app/context/themeContext';
import Button from '../../reusable-components/button/Button';
import DarkHeroImageDesktop from '../../../public/hero-pictures/dark-hero-picture-desktop.png';
import DarkHeroImageMobile from '../../../public/hero-pictures/dark-hero-picture-mobile.png';
import LightHeroImageDesktop from '../../../public/hero-pictures/light-hero-picture-desktop.png';
import LightHeroImageMobile from '../../../public/hero-pictures/light-hero-picture-mobile.png';

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
            src={isLightTheme ? LightHeroImageDesktop : DarkHeroImageDesktop}
            className={`${style.heroImage} ${style.desktop}`}
            alt="hero picture desktop"
            priority
          />
          <Image
            src={isLightTheme ? LightHeroImageMobile : DarkHeroImageMobile}
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
