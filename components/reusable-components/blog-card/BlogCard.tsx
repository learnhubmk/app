import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';

import style from './blogCard.module.scss';
import shortenString from '../../../utils/shortenString';

interface BlogCardProps {
  title: string;
  body: string;
}

const BlogCard = ({ title, body }: BlogCardProps) => {
  return (
    <div className={style.cardContainer}>
      <div>
        <h2 className={`headline-m ${style.cardTitle}`}>{shortenString(title, 34)}</h2>

        <div className={style.divider} />
      </div>
      <div>
        <p className={style.bodyText}>{shortenString(body, 75)}</p>
        <Link href={`/blog/${title}`} className={style.blogCardBtn}>
          <HiArrowLongRight className={style.arrowIcon} />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
