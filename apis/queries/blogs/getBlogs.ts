import { useQuery } from '@tanstack/react-query';
import fetchBlogPosts from '../../../app/action';
import QUERY_KEYS from '../../queryKeys';

interface GetBlogsParams {
  pageTitle: string;
  blogCardsNumber: number;
}

const useGetBlogs = ({ pageTitle, blogCardsNumber }: GetBlogsParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.BLOGS.ALL, pageTitle, blogCardsNumber],
    queryFn: () => fetchBlogPosts(0, blogCardsNumber),
  });
};

export default useGetBlogs;
