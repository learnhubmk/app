'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import style from './projectsSection.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import projectsData from './projectData';
import ProjectCard from '../../reusable-components/projectCard/projectCard';

const ProjectsSection = () => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';
  const shouldUseCarousel = projectsData.length > 2;

  const options = {
    active: shouldUseCarousel,
    breakpoints: {
      '(min-width: 700px)': { active: false },
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
            Разгледај ги тековните проекти на кои што работат тимови од заедницата
          </p>
        </div>

        <div
          className={`${style.carouselContainer} ${projectsData.length > 2 ? style.manyCards : ''}`}
          ref={emblaRef}
        >
          <div className={style.projectContainer}>
            {projectsData.map((card) => (
              <ProjectCard
                id={card.id}
                key={card.id}
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
