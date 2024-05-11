import React from 'react';
import Image from 'next/image';
import style from './ProjectCard.module.scss';
import { useTheme } from '../../../app/context/themeContext';

export interface ProjectCardProps {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

const ProjectCard = ({ id, imageUrl, title, description }: ProjectCardProps) => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';
  return (
    <div
      className={`${style.projectCard} ${lightTheme ? style.lightProjectCard : style.darkProjectCard}`}
      key={id}
    >
      <div className={style.cardInnerContent}>
        <Image src={imageUrl} alt={title} width={452} height={185} />
        <div className={style.cardCont}>
          <div className={style.cardContent}>
            <h2
              className={`${style.cardTitle} ${lightTheme ? style.darkProjectTitle : style.lightProjectTitle}`}
            >
              {title}
            </h2>
            <p
              className={`${style.cardDesc} ${lightTheme ? style.darkProjectDesc : style.lightProjectDesc}`}
            >
              {description}
            </p>
            <div className={style.cardTags}>
              <p className={style.cardTag}>UX/UI</p>
              <p className={style.cardTag}>Front End</p>
              <p className={style.cardNum}>+3</p>
            </div>
          </div>
          <div className={style.cardParticipants}>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
