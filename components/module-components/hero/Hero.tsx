import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import style from './hero.module.scss';

import HeroImage from '../../../public/hero-picture.png';
import Button from '../../reusable-components/button/Button';

interface HeroProps {
  title: string;
  text: string;
}

const Hero = ({ title, text }: HeroProps) => {
  return (
    <div className={style.hero}>
      <div className={style.heroLeftContainer}>
        <h1 className={style.heroTitle}>{title}</h1>
        <p className={style.heroText}>{text}</p>
        <Link href="https://discord.com/invite/nUEKUWVveW" target="_blank">
          <Button
            href=""
            type="button"
            buttonText="Придружи ни се"
            buttonClass={['primaryButton', 'buttonWithIcon']}
            icon={<i className="bi bi-arrow-right" />}
          />
        </Link>
      </div>
      <div className={style.heroImage}>
        <Image
          width={620}
          height={450}
          src={HeroImage}
          className={style.heroImage}
          alt="hero picture"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
