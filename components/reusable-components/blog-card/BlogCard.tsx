import React from 'react';
import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';
import { BsSave, BsFillShareFill } from 'react-icons/bs';

import style from './blogCard.module.scss';
import shortenString from '../../../utils/shortenString';

export interface BlogCardProps {
  // eslint-disable-next-line react/no-unused-prop-types
  id: number;
  title: string;
  body: string;
  pageTitle: string;
}

const BlogCard = ({ title, body, pageTitle }: BlogCardProps) => {
  return (
    <Link href={`/blog/${title}`} className={style.blogCardContainer}>
      <div>
        <h2 className={`headline-s ${style.blogCardTitle}`}>{shortenString(title, 34)}</h2>
        <div className={style.blogCardDivider} />
      </div>
      {pageTitle === 'blog' && (
        <div className={style.blogCardInfo}>
          <p>Author</p>
          <p>Date</p>
        </div>
      )}
      <div>
        <p>{shortenString(body, 75)}</p>
      </div>
      <div>
        {pageTitle === 'blog' ? (
          <div className={style.btnsContainer}>
            <div className={style.blogCardBtn}>Learn More</div>
            <div>
              <BsSave className={style.saveIcon} />
              <BsFillShareFill className={style.shareIcon} />
            </div>
          </div>
        ) : (
          <div className={style.blogCardHomeBtn}>
            <HiArrowLongRight className={style.arrowIcon} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default BlogCard;
