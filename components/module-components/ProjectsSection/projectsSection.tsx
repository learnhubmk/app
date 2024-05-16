'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import style from './projectsSection.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import ProjectCard, { ProjectCardProps } from '../../reusable-components/ProjectCard/ProjectCard';

interface Props {
  cards: ProjectCardProps[];
}

const ProjectsSection = ({ cards }: Props) => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';

  const options = {
    active: true,
    breakpoints: {
      '(min-width: 900px)': { active: false },
    },
  };
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <section
      className={`${style.projectSection} ${lightTheme ? style.lightPrSection : style.darkPrSection}`}
    >
      <div className={style.projectCardsWrapper}>
        <div className={style.projectText}>
          <h1
            className={`${style.projectTitle} ${lightTheme ? style.lightProjectTitle : style.darkProjectTitle}`}
          >
            Проекти
          </h1>
          <p
            className={`${style.projectDesc} ${lightTheme ? style.lightProjectDesc : style.darkProjectDesc}`}
          >
            Овозможете си да достигнете нови височини, развивајќи и споделувајќи вештини cо заедница
            од ентузијасти и професионалци.
          </p>
        </div>

        <div className={style.carouselContainer} ref={emblaRef}>
          <div className={style.projectContainer}>
            {cards.map((card, index) => (
              <ProjectCard
                id={card.id}
                // eslint-disable-next-line react/no-array-index-key
                key={`${card.id}-${index}`}
                imageUrl={card.imageUrl}
                title={card.title}
                description={card.description}
                department={card.department}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
