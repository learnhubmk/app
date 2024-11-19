'use server';

import axios from 'axios';
import axiosInstance from '../apis/axiosInstance';
import { BlogCardProps } from '../components/reusable-components/blog-card/BlogCard';

const fetchBlogPosts = async (
  nextPosts: number,
  blogCardsNumber: number
): Promise<BlogCardProps[]> => {
  try {
    const { data } = await axiosInstance.get('/posts', {
      params: {
        limit: blogCardsNumber,
        skip: nextPosts,
      },
    });
    return data.posts;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'An error occurred while fetching blog posts'
      );
    }
    throw new Error('An unexpected error occurred');
  }
};

export default fetchBlogPosts;
