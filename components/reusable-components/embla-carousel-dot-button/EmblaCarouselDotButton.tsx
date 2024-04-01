import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  // eslint-disable-next-line no-unused-vars
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (emblaApi: EmblaCarouselType | undefined): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApiDots: EmblaCarouselType) => {
    setScrollSnaps(emblaApiDots.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApiDots: EmblaCarouselType) => {
    setSelectedIndex(emblaApiDots.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

export const DotButton = (props: any) => {
  const { children, ...restProps } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div type="button" {...restProps}>
      {children}
    </div>
  );
};
