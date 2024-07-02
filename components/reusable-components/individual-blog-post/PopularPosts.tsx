import React from 'react';
import style from './popularPosts.module.scss';
import { useTheme } from '../../../app/context/themeContext';

interface PopularPostsProps {
  id?: number;
  author: string;
  date: string;
  description: string;
}

const PopularPosts = ({ id, author, date, description }: PopularPostsProps) => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';

  return (
    <div
      className={`${style.popularPost} ${lightTheme ? style.lightPopular : style.darkPopular}`}
      key={id}
    >
      <p
        className={`${style.popularInfo} ${lightTheme ? style.lightPopularInfo : style.darkPopularInfo}`}
      >
        By {author} | {date}
      </p>
      <p
        className={`${style.popularDesc} ${lightTheme ? style.lightPopularDesc : style.darkPopularDesc}`}
      >
        {description}
      </p>
    </div>
  );
};

export default PopularPosts;
