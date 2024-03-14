import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';

import style from './blogCard.module.scss';

interface BlogCardProps {
  id: string;
  title: string;
  body: string;
}

function BlogCard({ id, title, body }: BlogCardProps) {
  const truncate = (str, noWords) => {
    return str.split(' ').splice(0, noWords).join(' ');
  };
  return (
    <div key={id} className={style.cardContainer}>
      <div>
        <h2 className={`headline-m ${style.cardTitle}`}>{title}</h2>
        <div className={style.divider} />
      </div>
      <div>
        <p className={style.bodyText}>{`${truncate(body, 10)}...`}</p>
        <Link href={`/blog/${title}`} className={style.blogCardBtn}>
          <HiArrowLongRight className={style.arrowIcon} />
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
