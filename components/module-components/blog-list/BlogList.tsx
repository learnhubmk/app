'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';
import CustomCursor from '../../custom-cursor/Customcursor';
import BlogCard from '../../reusable-components/blog-card/BlogCard';
import style from './blogList.module.scss';
import { CursorProvider, useCursor } from '../../context/CursorContext';

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

const BlogList: React.FC = () => {
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
    return <div>Loading...</div>;
  }

  return (
    <CursorProvider>
      <>
        <div
          className={`grid grid__1x3 ${style.containerMargin}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {data.posts
            ?.slice(0, 6)
            .map((post: { id: string; title: string; body: string }) => (
              <BlogCard key={post?.id} title={post?.title} body={post?.body} />
            ))}
        </div>
        <Link href="/blog" className={style.blogBtn}>
          Види повеќе <HiArrowLongRight fontSize={22} />
        </Link>
        {isHovered && <CustomCursor isLarge />}
      </>
    </CursorProvider>
  );
};

export default BlogList;
