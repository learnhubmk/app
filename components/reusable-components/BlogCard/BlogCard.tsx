import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';

import style from './blogCard.module.scss';

interface BlogCardProps {
  title: string;
  body: string;
}

interface TruncateProps {
  str: string;
  noWords: number;
}

function BlogCard({ title, body }: BlogCardProps) {
  const truncate = ({ str, noWords }: TruncateProps) => {
    return str.split(' ').slice(0, noWords).join(' ');
  };
  return (
    <div className={style.cardContainer}>
      <div>
        <h2
          className={`headline-m ${style.cardTitle}`}
        >{`${truncate({ str: title, noWords: 5 })}...`}</h2>
        <div className={style.divider} />
      </div>
      <div>
        <p className={style.bodyText}>{`${truncate({ str: body, noWords: 10 })}...`}</p>
        <Link href={`/blog/${title}`} className={style.blogCardBtn}>
          <HiArrowLongRight className={style.arrowIcon} />
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
