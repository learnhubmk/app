'use client';

import React from 'react';
import style from './projectsSection.module.scss';
import { useTheme } from '../../../app/context/themeContext';
import ProjectCard, { ProjectCardProps } from '../../reusable-components/ProjectCard/ProjectCard';

interface Props {
  cards: ProjectCardProps[];
}

const ProjectsSection = ({ cards }: Props) => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1, // Display one card at a time
  //   slidesToScroll: 1,
  // };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2, // Display one card at a time
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 768, // Adjust breakpoint for mobile phones
  //       settings: {
  //         slidesToShow: 1, // Display two cards at a time on mobile phones
  //         slidesToScroll: 1,
  //       },

  return (
    <section
      className={`${style.projectSection} ${lightTheme ? style.lightPrSection : style.darkPrSection}`}
    >
      <div className={style.projectText}>
        <h1
          className={`${style.projectTitle} ${lightTheme ? style.darkProjectTitle : style.lightProjectTitle}`}
        >
          Проекти
        </h1>
        <p
          className={`${style.projectDesc} ${lightTheme ? style.darkProjectDesc : style.lightProjectDesc}`}
        >
          Project description consectetur adipscing elit, sed do eiusmod tempor incididunt ut labore
          et ddolore magna aliqua.
        </p>
      </div>

      {/* Render individual cards on laptops */}
      <div className={style.projectContainer}>
        {cards.map((card) => (
          <ProjectCard
            id={card.id}
            key={card.id}
            imageUrl={card.imageUrl}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

      <div className={style.projectContainer}>
        {/* Render the slider only on mobile devices */}
        {/* <div className={style.mobileSlider}>
          {/* <Slider {...settings}>
            {cards.map((card, index) => (
              <div
                key={index}
                className={`${style.mobileCard} ${lightTheme ? style.lightProjectCard : style.darkProjectCard}`}
              >
                <img src={card.imageUrl} alt={card.title} />
                <div className={style.mobileContent}>
                  <h2
                    className={`${style.mobileTitle} ${lightTheme ? style.darkProjectTitle : style.lightProjectTitle}`}
                  >
                    {card.title}
                  </h2>
                  <p
                    className={`${style.mobileDesc} ${lightTheme ? style.darkProjectDesc : style.lightProjectDesc}`}
                  >
                    {card.description}
                  </p>
                  <button>Button 1</button>
                  <button>Button 2</button>
                </div>
              </div>
            ))}
          </Slider>
        </div> */}
      </div>
    </section>
  );
};

export default ProjectsSection;
