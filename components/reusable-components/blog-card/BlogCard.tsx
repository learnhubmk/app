'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';
import { BsSave, BsFillShareFill } from 'react-icons/bs';
import { CursorProvider, useCursor } from '../../context/CursorContext';
import CustomCursor from '../../custom-cursor/CustomCursor';
import style from './blogCard.module.scss';
import shortenString from '../../../utils/shortenString';

interface BlogCardProps {
  title: string;
  body: string;
  pageTitle: string;
}

const BlogCard = ({ title, body, pageTitle }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setHideCursor } = useCursor();

  useEffect(() => {
    setHideCursor(isHovered);
  }, [isHovered, setHideCursor]);

  return (
    <CursorProvider>
      <Link
        href={`/blog/${title}`}
        className={style.blogCardContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
              <Link href={`/blog/${title}`} className={style.blogCardBtn}>
                Learn More
              </Link>
              <div>
                <BsSave className={style.saveIcon} />
                <BsFillShareFill className={style.shareIcon} />
              </div>
            </div>
          ) : (
            <Link href={`/blog/${title}`} className={style.blogCardHomeBtn}>
              <HiArrowLongRight className={style.arrowIcon} />
            </Link>
          )}
        </div>
      </Link>
      {isHovered && <CustomCursor isLargeCursor />}
    </CursorProvider>
  );
};

export default BlogCard;
