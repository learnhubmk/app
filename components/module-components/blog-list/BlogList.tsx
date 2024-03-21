import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';

import BlogCard from '../../reusable-components/blog-card/BlogCard';
import style from './blogList.module.scss';

const getPosts = async () => {
  const res = await fetch('https://dummyjson.com/posts');

  return res.json();
};

const BlogList = async () => {
  const data = await getPosts();

  if (!data.posts) {
    return <div className="headline-m">Нема блог постови во моментов</div>;
  }

  return (
    <>
      <div className={`grid grid__1x3 ${style.containerMargin}`}>
        {data.posts?.slice(0, 6).map((post: { id: string; title: string; body: string }) => {
          return <BlogCard key={post?.id} title={post?.title} body={post?.body} />;
        })}
      </div>
      <Link href="/blog" className={style.blogBtn}>
        Види повеќе <HiArrowLongRight fontSize={22} />
      </Link>
    </>
  );
};

export default BlogList;
