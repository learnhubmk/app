'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQueryClient } from '@tanstack/react-query';

import fetchBlogPosts from '../../../app/action';

import style from './infiniteScroll.module.scss';
import BlogCard, { BlogCardProps } from '../blog-card/BlogCard';

let nextPosts = 6;

const InfiniteScroll = ({
  gridLayout,
  pageTitle,
  blogCardsNumber,
}: {
  gridLayout: string;
  pageTitle: string;
  blogCardsNumber: number;
}) => {
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  const [data, setData] = useState<BlogCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (inView) {
      const delay = 500;

      const timeoutId = setTimeout(() => {
        fetchBlogPosts(nextPosts, blogCardsNumber).then((res) => {
          if (res.length === 0) {
            setIsLoading(false);
          } else {
            setData((prevData) => [...prevData, ...res]);
            nextPosts += 6;
            setIsLoading(true);

            // Update the query cache
            queryClient.setQueryData(
              ['blogPosts', pageTitle, blogCardsNumber],
              (oldData: BlogCardProps[] | undefined) => {
                return oldData ? [...oldData, ...res] : res;
              }
            );
          }
        });
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, pageTitle, blogCardsNumber, queryClient]);

  return (
    <>
      <section className={`grid ${gridLayout} ${style.blogListContainer}`}>
        {data.map((post: BlogCardProps) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            pageTitle={pageTitle}
          />
        ))}
      </section>
      <section className={style.loadingContainer}>
        <div ref={ref}>{inView && isLoading ? <p>Loading...</p> : <p>No more posts</p>}</div>
      </section>
    </>
  );
};

export default InfiniteScroll;
