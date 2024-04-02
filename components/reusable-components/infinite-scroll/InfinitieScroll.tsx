'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import fetchBlogPosts from '../../../app/action';

import style from './infinitieScroll.module.scss';

let nextPosts = 8;

export type BlogCard = React.JSX.Element;

const InfinitieScroll = ({
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
      setIsLoading(true);
      const delay = 100;

      const timeoutId = setTimeout(() => {
        fetchBlogPosts(nextPosts, pageTitle, blogCardsNumber).then((res) => {
          setData([...data, ...res]);
          nextPosts += 8;
        });

        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, data, isLoading, pageTitle, blogCardsNumber]);

  return (
    <>
      <section className={`grid ${gridLayout} ${style.blogListContainer}`}>{data}</section>
      <section>
        <div ref={ref}>
          <p>Loading...</p>
        </div>
      </section>
    </>
  );
};

export default InfinitieScroll;
