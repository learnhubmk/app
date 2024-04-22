import Image from 'next/image';
import style from './hero.module.scss';

interface HeroProps {
  title: string;
  text: string;
}

const Hero = ({ title, text }: HeroProps) => {
  return (
    <div className={style.hero}>
      <div className={style.heroLeftContainer}>
        <h1 className={`display-l ${style.heroTitle}`}>{title}</h1>
        <p className={`headline-m ${style.heroText}`}>{text}</p>
      </div>
      <div>
        <Image width={620} height={450} src="/hero-picture.png" alt="hero picture" priority />
      </div>
    </div>
  );
};

export default Hero;
