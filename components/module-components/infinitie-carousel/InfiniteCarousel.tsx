'use client';

import multipliedArray from './InfiniteCarouselData';
import style from './infiniteCarousel.module.scss';

const InfiniteCarousel = () => {
  return (
    <div className={style.slider}>
      <div className={style.slideTrack}>
        {multipliedArray.map((item) => (
          <div className={style.slide} key={Math.floor(Math.random() * 1000)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
