'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import fetchBlogPosts from '../../../app/action';

import style from './infiniteScroll.module.scss';

let nextPosts = 8;

export type BlogCard = React.JSX.Element;

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

  const [data, setData] = useState<BlogCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (inView) {
      const delay = 500;

      const timeoutId = setTimeout(() => {
        fetchBlogPosts(nextPosts, pageTitle, blogCardsNumber).then((res) => {
          if (res.length === 0) {
            setIsLoading(false);
          } else {
            setData([...data, ...res]);
            nextPosts += 8;
            setIsLoading(true);
          }
        });
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, data, isLoading, pageTitle, blogCardsNumber]);

  return (
    <>
      <section className={`grid ${gridLayout} ${style.blogListContainer}`}>{data}</section>
      <section className={style.loadingContainer}>
        <div ref={ref}>{inView && isLoading ? <p>Loading...</p> : <p>No more posts</p>}</div>
      </section>
    </>
  );
};

export default InfiniteScroll;
