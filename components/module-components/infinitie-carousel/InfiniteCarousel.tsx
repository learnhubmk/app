'use client';

import { useTheme } from '../../../app/context/themeContext';
import multipliedArray from './InfiniteCarouselData';
import style from './infiniteCarousel.module.scss';

const InfiniteCarousel = () => {
  const { theme } = useTheme();
  const isThemeLight = theme === 'light';
  return (
    <div className={`${style.slider} ${isThemeLight && style.sliderLight}`}>
      <div className={style.slideTrack}>
        {multipliedArray.map((item) => (
          <div className={style.slide} key={Date.now() + Math.random()}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
