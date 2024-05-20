import multipliedArray from './InfiniteCarouselData';
import style from './infiniteCarousel.module.scss';

const InfiniteCarousel = () => {
  return (
    <div className={style.slider}>
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
