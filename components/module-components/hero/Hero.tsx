import Image from 'next/image';
import style from './hero.module.scss';

interface HeroProps {
  title: string;
  headline: string;
  text: string;
}

const Hero = ({ title, headline, text }: HeroProps) => {
  return (
    <div className={style.hero}>
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
