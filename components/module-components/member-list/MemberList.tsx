'use client';

import useEmblaCarousel from 'embla-carousel-react';
import MemberCard from '../../reusable-components/member-card/MemberCard';
import style from './memberList.module.scss';

const FakeMemberData = {
  members: [
    {
      memberName: 'Kire',
      memberInfo:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quas repudianda delectus dolorum tempora.',
      memberSkills: ['HTML', 'CSS', 'JavaScript', 'PR1', 'PR2', 'PR3'],
      memberProjects: ['LearnHub', '', ''],
    },
    {
      memberName: 'Nino',
      memberInfo:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quas repudianda delectus dolorum tempora.',
      memberSkills: ['NextJS', 'SCSS', 'TypeScript', 'PR1', 'PR2', 'PR3'],
      memberProjects: ['AxM', '', ''],
    },
    {
      memberName: 'Pero',
      memberInfo:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quas repudianda delectus dolorum tempora.',
      memberSkills: ['PhP', 'NodeJS', 'JavaScript', 'PR1', 'PR3', 'PR4'],
      memberProjects: ['Pero.mk', '', ''],
    },
    {
      memberName: 'Pero',
      memberInfo:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quas repudianda delectus dolorum tempora.',
      memberSkills: ['PhP', 'NodeJS', 'JavaScript', 'PR1', 'PR3', 'PR4'],
      memberProjects: ['Pero.mk', '', ''],
    },
    {
      memberName: 'Pero',
      memberInfo:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quas repudianda delectus dolorum tempora.',
      memberSkills: ['PhP', 'NodeJS', 'JavaScript', 'PR1', 'PR3', 'PR4'],
      memberProjects: ['Pero.mk', '', ''],
    },
  ],
};

const MemberList = () => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <section className={style.memberSectionContainer}>
      <div className={style.headlineContainer}>
        <h2 className="display-l">LearnHub Member Spotlight</h2>
      </div>
      <div className={style.carouselContainer} ref={emblaRef}>
        <div className={style.carouselCardsContainer}>
          {FakeMemberData.members.map((member) => (
            <MemberCard
              key={member.memberName}
              memberName={member.memberName}
              memberInfo={member.memberInfo}
              memberSkills={member.memberSkills}
              memberProjects={member.memberProjects}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberList;
