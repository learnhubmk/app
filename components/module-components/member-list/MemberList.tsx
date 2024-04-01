'use client';

import useEmblaCarousel from 'embla-carousel-react';
import MemberCard from '../../reusable-components/member-card/MemberCard';
import style from './memberList.module.scss';
import {
  DotButton,
  useDotButton,
} from '../../reusable-components/embla-carousel-dot-button/EmblaCarouselDotButton';
import FakeMemberData from './memberData';

const MemberList = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <section className={style.memberSectionContainer}>
      <div className={style.headlineContainer}>
        <h2 className="display-l">LearnHub Member Spotlight</h2>
      </div>
      <div className={style.carouselContainer} ref={emblaRef}>
        <div className={style.carouselCardsContainer}>
          {FakeMemberData.members?.map((member) => (
            <MemberCard
              key={member.memberName}
              memberName={member.memberName}
              memberImage={member.memberImage}
              memberInfo={member.memberInfo}
              memberSkills={member.memberSkills}
              memberProjects={member.memberProjects}
            />
          ))}
        </div>
        <div className={style.emblaDots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={index === selectedIndex ? style.emblaDotSelected : style.emblaDot}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberList;
