'use client';

import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import style from './blogList.module.scss';
import fetchBlogPosts from '../../../app/action';
import InfiniteScroll from '../../reusable-components/infinite-scroll/InfiniteScroll';
import Button from '../../reusable-components/button/Button';
import BlogCard, { BlogCardProps } from '../../reusable-components/blog-card/BlogCard';
import Loading from '../../../app/loading';

interface BlogListProps {
  pageTitle: string;
  gridLayout: string;
  blogCardsNumber: number;
}

const BlogList = ({ pageTitle, gridLayout, blogCardsNumber }: BlogListProps) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchBlogPosts(0, pageTitle, blogCardsNumber),
    queryKey: ['blogPosts', pageTitle, blogCardsNumber],
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="headline-m">Error loading blog posts</div>;
  if (!data || data.length === 0)
    return <div className="headline-m">No blog posts available at the moment</div>;

  return (
    <>
      <div className={`grid ${gridLayout} ${pageTitle === 'home' && style.blogListContainer}`}>
        {data.map((post: BlogCardProps) => (
          <BlogCard
            key={post?.id}
            id={post?.id}
            title={post?.title}
            body={post?.body}
            pageTitle={pageTitle}
          />
        ))}
      </div>

      {pageTitle === 'home' && (
        <Link href="/blog">
          <Button
            type="button"
            href="/blog"
            buttonText="Види повеќе"
            buttonClass={['primaryButton', 'buttonWithIcon']}
            icon={<i className="bi bi-arrow-right" />}
          />
        </Link>
      )}

      {pageTitle === 'blog' && (
        <InfiniteScroll gridLayout={gridLayout} pageTitle={pageTitle} blogCardsNumber={6} />
      )}
    </>
  );
};

export default BlogList;
