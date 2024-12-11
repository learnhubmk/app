import { useQuery } from '@tanstack/react-query';
import { MetaData } from '../../../Types';
import QUERY_KEYS from '../../queryKeys';
import ENDPOINTS from '../../endpoints';
import axiosInstance from '../../axiosInstance';

export interface BlogPost {
  id: string;
  title: string;
  tags: { name: string }[];
  author: string;
}

export interface BlogPostAPI {
  slug: string;
  title: string;
  tags: { name: string }[];
  author: { first_name: string; last_name: string };
}

export interface BlogsResponse {
  data: BlogPostAPI[];
  meta: MetaData;
}

const useGetBlogs = (search?: string, page?: number, itemsPerPage?: number, status?: string) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.BLOGS.ALL, search, page, itemsPerPage],
    queryFn: async () => {
      const url = `${ENDPOINTS.BLOGS.GET_ALL}?title=${encodeURIComponent(search || '')}&page=${page || 1}&per_page=${itemsPerPage}`;
      const response = await axiosInstance.get<BlogsResponse>(url, {
        params: { status: status || 'published' },
      });
      return response.data;
    },
    select: (response) => ({
      ...response,
      data: response.data.map((item: BlogPostAPI) => ({
        id: item.slug,
        title: item.title,
        tags: item.tags,
        author: `${item.author.first_name} ${item.author.last_name}`,
      })),
    }),
  });
};

export default useGetBlogs;
