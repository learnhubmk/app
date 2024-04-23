import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';

import shortenString from '../../../utils/shortenString';
import blogCardImage from '../../../public/blog-image.png';
import calculateReadingTime from '../../../utils/calculateReadingTime';
import style from './blogCard.module.scss';

export interface BlogCardProps {
  // eslint-disable-next-line react/no-unused-prop-types
  id: number;
  title: string;
  body: string;
  pageTitle?: string;
}

// eslint-disable-next-line no-unused-vars
const BlogCard = ({ title, body, pageTitle }: BlogCardProps) => {
  return (
    <Link href={`/blog/${title}`} className={style.blogCardContainer}>
      <Image src={blogCardImage} className={style.image} width={412} height={185} alt={title} />
      <div className={style.blogCardContentContainer}>
        <h2 className={`headline-s ${style.blogCardTitle}`}>{shortenString(title, 34)}</h2>
        <p className={style.blogCardBody}>{shortenString(body, 75)}</p>
        {pageTitle === 'home' && (
          <div className={style.blogCardDateTime}>
            <p>Date</p> | <p>{calculateReadingTime(body)}</p>
          </div>
        )}
        {pageTitle === 'blog' && (
          <div className={style.tagsContainer}>
            <div className={style.tag}>Tag 01</div>
            <div className={style.tag}>Tag 02</div>
            <p className={style.tagsNumber}>+3</p>
          </div>
        )}

        <div
          className={pageTitle === 'home' ? style.homeButtonContainer : style.buttonAvatarContainer}
        >
          {pageTitle === 'blog' && (
            <div className={style.avatarsContainer}>
              <i className={`${style.avatar} bi bi-person-circle`} />
              <i className={`${style.avatar} bi bi-person-circle`} />
              <i className={`${style.avatar} bi bi-person-circle`} />
              <span className={style.avatarsNumber}>+3</span>
            </div>
          )}
          <p>Прочитај повеќе</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
