import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

import style from './blogCard.module.scss';
import shortenString from '../../../utils/shortenString';

interface BlogCardProps {
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
              <i className={`bi bi-save ${style.saveIcon}`} />
              <i className={`bi bi-share-fill ${style.shareIcon}`} />
            </div>
          </div>
        ) : (
          <div className={style.blogCardHomeBtn}>
            <i className={`bi bi-arrow-right ${style.arrowIcon}`} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default BlogCard;
