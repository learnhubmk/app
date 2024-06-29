import React from 'react';
import style from './popularPosts.module.scss';

interface PopularPostsProps {
  id?: number;
  author: string;
  date: string;
  description: string;
}

const PopularPosts = ({ id, author, date, description }: PopularPostsProps) => {
  return (
    <div className={style.popularPost} key={id}>
      <p className={style.popularInfo}>
        By {author} | {date}
      </p>
      <p className={style.popularDesc}>{description}</p>
    </div>
  );
};

export default PopularPosts;
