import React from 'react';
import Image from 'next/image';
import style from './ProjectCard.module.scss';
import { useTheme } from '../../../app/context/themeContext';

export interface ProjectCardProps {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  department: string[];
}

const ProjectCard = ({ id, imageUrl, title, description, department }: ProjectCardProps) => {
  const { theme } = useTheme();
  const darkTheme = theme === 'dark';
  return (
    <div className={style.projectCard} key={id}>
      <div className={`${style.cardInner} ${darkTheme ? style.darkProjectCard : ''}`}>
        <div className={style.imageWrapper}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="300px"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>

        <div className={style.cardContent}>
          <h2 className={style.cardTitle}>{title}</h2>
          <p className={style.cardDesc}>{description}</p>

          <div className={style.cardTags}>
            {department.slice(0, 2).map((item) => (
              <div key={item} className={style.cardTag}>
                {item}
              </div>
            ))}
            {department.length > 2 && (
              <div className={style.cardTagHidden}>+{department.length - 2}</div>
            )}
          </div>
          <div className={style.cardParticipants}>
            <svg
              width="62"
              height="24"
              viewBox="0 0 62 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM19.632 17.796C17.916 15.708 13.752 15 12 15C10.248 15 6.084 15.708 4.368 17.796C3.144 16.188 2.4 14.184 2.4 12C2.4 6.708 6.708 2.4 12 2.4C17.292 2.4 21.6 6.708 21.6 12C21.6 14.184 20.856 16.188 19.632 17.796ZM7.8 9C7.8 6.672 9.672 4.8 12 4.8C14.328 4.8 16.2 6.672 16.2 9C16.2 11.328 14.328 13.2 12 13.2C9.672 13.2 7.8 11.328 7.8 9Z"
                fill="#0F172A"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31 0C24.376 0 19 5.376 19 12C19 18.624 24.376 24 31 24C37.624 24 43 18.624 43 12C43 5.376 37.624 0 31 0ZM38.632 17.796C36.916 15.708 32.752 15 31 15C29.248 15 25.084 15.708 23.368 17.796C22.144 16.188 21.4 14.184 21.4 12C21.4 6.708 25.708 2.4 31 2.4C36.292 2.4 40.6 6.708 40.6 12C40.6 14.184 39.856 16.188 38.632 17.796ZM26.8 9C26.8 6.672 28.672 4.8 31 4.8C33.328 4.8 35.2 6.672 35.2 9C35.2 11.328 33.328 13.2 31 13.2C28.672 13.2 26.8 11.328 26.8 9Z"
                fill="#7598EB"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M50 0C43.376 0 38 5.376 38 12C38 18.624 43.376 24 50 24C56.624 24 62 18.624 62 12C62 5.376 56.624 0 50 0ZM57.632 17.796C55.916 15.708 51.752 15 50 15C48.248 15 44.084 15.708 42.368 17.796C41.144 16.188 40.4 14.184 40.4 12C40.4 6.708 44.708 2.4 50 2.4C55.292 2.4 59.6 6.708 59.6 12C59.6 14.184 58.856 16.188 57.632 17.796ZM45.8 9C45.8 6.672 47.672 4.8 50 4.8C52.328 4.8 54.2 6.672 54.2 9C54.2 11.328 52.328 13.2 50 13.2C47.672 13.2 45.8 11.328 45.8 9Z"
                fill="#41AD3E"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
