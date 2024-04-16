'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BlogCard from '../../reusable-components/blog-card/BlogCard';
import 'bootstrap-icons/font/bootstrap-icons.css';

import style from './blogList.module.scss';
import { CursorProvider, useCursor } from '../../context/CursorContext';

interface BlogListProps {
  pageTitle: string;
  gridLayout: string;
}

const getPosts = async () => {
  try {
    const res = await fetch('https://dummyjson.com/posts');
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

const BlogList = ({ pageTitle, gridLayout }: BlogListProps) => {
  const [data, setData] = useState<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { setHideCursor } = useCursor();

  useEffect(() => {
    const fetchData = async () => {
      const postData = await getPosts();
      setData(postData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setHideCursor(isHovered);
  }, [isHovered, setHideCursor]);

  if (!data) {
    return <div className="headline-m">Нема блог постови во моментов</div>;
  }

  return (
    <CursorProvider>
      <div
        className={`grid ${gridLayout} ${style.blogListContainer}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {data.posts?.slice(0, 6).map((post: { id: string; title: string; body: string }) => {
          return (
            <BlogCard key={post?.id} title={post?.title} body={post?.body} pageTitle={pageTitle} />
          );
        })}
      </div>
      {pageTitle === 'home' && (
        <Link href="/blog" className={style.blogBtn}>
          Види повеќе <i className="bi bi-arrow-right" />
        </Link>
      )}
    </CursorProvider>
  );
};

export default BlogList;
