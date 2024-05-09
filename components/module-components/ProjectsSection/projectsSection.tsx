'use client';

import React from 'react';
import Image from 'next/image';
import style from './projectsSection.module.scss';
import { useTheme } from '../../../app/context/themeContext';
// import Slider from 'react-slick';
// import projectImg from './Bgphoto.jpg'

const ProjectsSection = () => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';

  const cards = [
    {
      id: 0,
      imageUrl: 'https://picsum.photos/id/237/200/300',
      title: 'LearnHub платформа',
      description:
        'Project description consectetur adipscing elit, sed do eiusmod tempor incididunt ut labore et ddolore magna aliqua',
    },
    {
      id: 1,
      imageUrl: 'https://picsum.photos/id/237/200/300',
      title: 'LinkMe',
      description:
        'Project description consectetur adipscing elit, sed do eiusmod tempor incididunt ut labore et ddolore magna aliqua.',
    },
    // Add more cards as needed
  ];

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
          <div
            className={`${style.projectCard} ${lightTheme ? style.lightProjectCard : style.darkProjectCard}`}
            key={card.id}
          >
            <Image src={card.imageUrl} alt={card.title} width={452} height={185} />
            <div className={style.cardCont}>
              <div className={style.cardContent}>
                <h2
                  className={`${style.cardTitle} ${lightTheme ? style.darkProjectTitle : style.lightProjectTitle}`}
                >
                  {card.title}
                </h2>
                <p
                  className={`${style.cardDesc} ${lightTheme ? style.darkProjectDesc : style.lightProjectDesc}`}
                >
                  {card.description}
                </p>
                <div className={style.cardTags}>
                  <p className={style.cardTag}>UX/UI</p>
                  <p className={style.cardTag}>Front End</p>
                  <p className={style.cardNum}>+3</p>
                </div>
              </div>
              <div className={style.cardParticipants}>
                <div />
                <div>
                  <button type="button">Види проект</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        ;
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
