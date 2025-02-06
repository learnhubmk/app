import { useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import QUERY_KEYS from '../../queryKeys';
import { BlogDetailsData } from '../../../components/reusable-components/_Types';
import ENDPOINTS from '../../endpoints';

const fetchBlogDetails = async (id: string): Promise<BlogDetailsData> => {
  const session = await getSession();
  const response = await fetch(`${ENDPOINTS.BLOGS.GET_ALL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  const blogPost = data.data;

  return {
    title: blogPost.title,
    image: blogPost.image,
    content: blogPost.content,
    author: {
      first_name: blogPost.author.first_name,
      last_name: blogPost.author.last_name,
    },
    publishDate: blogPost.publish_date
      ? new Date(blogPost.publish_date).toISOString().split('T')[0]
      : 'N/A',
    tags: Array.isArray(blogPost.tags) ? blogPost.tags : [],
    id: blogPost.id,
    status: blogPost.status,
  };
};

const useGetBlogDetails = (id: string) => {
  return useQuery<BlogDetailsData, Error>({
    queryKey: [...QUERY_KEYS.BLOGS.ALL, id],
    queryFn: () => fetchBlogDetails(id),
  });
};

export default useGetBlogDetails;
