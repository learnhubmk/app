import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';

import BlogCard from '../../reusable-components/blog-card/BlogCard';
import style from './blogList.module.scss';

interface BlogListProps {
  pageTitle: string;
  gridLayout: string;
}

const getPosts = async () => {
  try {
    const res = await fetch('https://dummyjson.com/posts');

    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

const BlogList = async ({ pageTitle, gridLayout }: BlogListProps) => {
  const data = await getPosts();

  if (!data.posts) {
    return <div className="headline-m">Нема блог постови во моментов</div>;
  }

  return (
    <>
      <div className={`grid ${gridLayout} ${style.blogListContainer}`}>
        {data.posts?.slice(0, 6).map((post: { id: string; title: string; body: string }) => {
          return (
            <BlogCard key={post?.id} title={post?.title} body={post?.body} pageTitle={pageTitle} />
          );
        })}
      </div>
      {pageTitle === 'home' && (
        <Link href="/blog" className={style.blogBtn}>
          Види повеќе <HiArrowLongRight fontSize={22} />
        </Link>
      )}
    </>
  );
};

export default BlogList;
