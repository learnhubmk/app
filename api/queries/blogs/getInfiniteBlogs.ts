import { useInfiniteQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';
import fetchBlogPosts from '../../../app/action';
import { BlogCardProps } from '../../../components/reusable-components/blog-card/BlogCard';

interface GetInfiniteBlogsParams {
  pageTitle: string;
  blogCardsNumber: number;
}
const useGetInfiniteBlogs = ({ pageTitle, blogCardsNumber }: GetInfiniteBlogsParams) => {
  return useInfiniteQuery<
    BlogCardProps[],
    Error,
    BlogCardProps[],
    [string, string, string, string],
    number
  >({
    queryKey: [
      QUERY_KEYS.BLOGS.INFINITE[0],
      QUERY_KEYS.BLOGS.INFINITE[1],
      pageTitle,
      blogCardsNumber.toString(),
    ],
    queryFn: ({ pageParam }) => fetchBlogPosts(pageParam, blogCardsNumber),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === blogCardsNumber ? allPages.length * blogCardsNumber : undefined;
    },
  });
};

export default useGetInfiniteBlogs;
