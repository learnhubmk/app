import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import style from './suggestedPost.module.scss';
import Clock from '../../../public/blog-icons/clock.svg';
import { useTheme } from '../../../app/context/themeContext';

interface SuggestedPostProps {
  id?: number;
  imageURL: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

const SuggestedPost = ({
  id,
  imageURL,
  title,
  description,
  date,
  readTime,
}: SuggestedPostProps) => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';

  return (
    <div
      className={`${style.suggestedContent} ${lightTheme ? style.lightSuggested : style.darkSuggested}`}
      key={id}
    >
      <div className={style.imageWrapper}>
        <Image src={imageURL} alt={title} height={185} width={412} className={style.imageStyle} />
      </div>
      <div className={style.textContainer}>
        <h4 className={style.cardTitle}>{title}</h4>
        <p className={`${style.cardDesc} ${lightTheme ? style.lightCardDesc : style.darkCardDesc}`}>
          {description}
        </p>
        <div className={style.postInfo}>
          <p>
            {date} |
            <Image src={Clock} alt="clock" />
            {readTime}
          </p>
        </div>
        <div className={style.postLink}>
          <Link href="https://www.learnhub.mk/blog">Прочитај повеќе</Link>
        </div>
      </div>
    </div>
  );
};

export default SuggestedPost;
