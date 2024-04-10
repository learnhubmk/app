'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import MemberCard from '../../reusable-components/member-card/MemberCard';
import style from './memberList.module.scss';
import FakeMemberData from './memberData';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '../../reusable-components/embla-carousel-arrow-button/EmblaCarouselArrowButton';

const options: EmblaOptionsType = { loop: true };

const MemberList = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

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
        <div className={style.emblaButtons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default MemberList;
