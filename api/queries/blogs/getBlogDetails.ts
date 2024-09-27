import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';
import { BlogDetailsData } from '../../../components/reusable-components/_Types';

const fetchBlogDetails = async (id: string): Promise<BlogDetailsData> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  // console.log('Raw API response:', data);

  const blogPost = data.data || data;

  return {
    title: blogPost.title || 'N/A',
    image: blogPost.image || '',
    content: blogPost.content || 'N/A',
    author: {
      firstName: blogPost.author?.firstName || blogPost.author?.first_name || 'N/A',
      lastName: blogPost.author?.lastName || blogPost.author?.last_name || 'N/A',
    },
    publishDate: blogPost.publish_date
      ? new Date(blogPost.publish_date).toISOString().split('T')[0]
      : 'N/A',
    tags: Array.isArray(blogPost.tags) ? blogPost.tags : [],
  };
};

const useGetBlogDetails = (id: string) => {
  return useQuery<BlogDetailsData, Error>({
    queryKey: [...QUERY_KEYS.BLOGS.ALL, id],
    queryFn: () => fetchBlogDetails(id),
  });
};

export default useGetBlogDetails;
