import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

import style from './blogList.module.scss';
import fetchBlogPosts from '../../../app/action';
import InfiniteScroll from '../../reusable-components/infinite-scroll/InfiniteScroll';

interface BlogListProps {
  pageTitle: string;
  gridLayout: string;
  blogCardsNumber: number;
}

const BlogList = async ({ pageTitle, gridLayout, blogCardsNumber }: BlogListProps) => {
  const data = await fetchBlogPosts(0, pageTitle, blogCardsNumber);

  if (!data) {
    return <div className="headline-m">Нема блог постови во моментов</div>;
  }

  return (
    <>
      <div className={`grid ${gridLayout} ${style.blogListContainer}`}>{data}</div>

      {pageTitle === 'home' && (
        <Link href="/blog" className={style.blogBtn}>
          Види повеќе <i className="bi bi-arrow-right" />
        </Link>
      )}

      {pageTitle === 'blog' && (
        <InfiniteScroll gridLayout={gridLayout} pageTitle={pageTitle} blogCardsNumber={8} />
      )}
    </>
  );
};

export default BlogList;
