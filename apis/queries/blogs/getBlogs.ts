import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';
import ENDPOINTS from '../../endpoints';
import axiosInstance from '../../axiosInstance';
import { BlogsResponse, RawBlogPost } from '../../../components/module-components/blogs/interfaces';

const useGetBlogs = (search?: string, page?: number, itemsPerPage?: number, status?: string) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.BLOGS.ALL, search, page, itemsPerPage, status],
    queryFn: async () => {
      const url = `${ENDPOINTS.BLOGS.GET_ALL}`;
      const response = await axiosInstance.get<BlogsResponse>(url, {
        params: {
          title: search || '',
          page: page || 1,
          per_page: itemsPerPage,
          status: status || 'published',
        },
      });
      return response.data;
    },
    select: (response) => ({
      ...response,
      data: response.data.map((item: RawBlogPost) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        status: item.status,
        author: `${item.author.first_name} ${item.author.last_name}`,
      })),
    }),
  });
};

export default useGetBlogs;
