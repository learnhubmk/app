'use server';

import BlogCard, { BlogCardProps } from '../components/reusable-components/blog-card/BlogCard';

const fetchBlogPosts = async (nextPosts: number, pageTitle: string, blogCardsNumber: number) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/posts?limit=${blogCardsNumber}&skip=${nextPosts}`
    );

    const data = await response.json();

    return data?.posts.map((post: BlogCardProps) => {
      return (
        <BlogCard
          key={post?.id}
          id={post?.id}
          title={post?.title}
          body={post?.body}
          pageTitle={pageTitle}
        />
      );
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export default fetchBlogPosts;
