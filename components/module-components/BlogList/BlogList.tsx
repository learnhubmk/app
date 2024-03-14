import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';

import BlogCard from '../../reusable-components/BlogCard/BlogCard';
import style from './blogList.module.scss';

const getPosts = async () => {
  const res = await fetch('https://dummyjson.com/posts');

  return res.json();
};

async function BlogList() {
  const data = await getPosts();
  return (
    <>
      <div className={`grid grid__1x3 ${style.containerMargin}`}>
        {data.posts?.slice(0, 6).map((post: { id: string; title: string; body: string }) => {
          return <BlogCard id={post?.id} title={post?.title} body={post?.body} />;
        })}
      </div>

      <Link href="/blog" className={style.blogBtn}>
        Види повеќе <HiArrowLongRight fontSize={22} />
      </Link>
    </>
  );
}

export default BlogList;
