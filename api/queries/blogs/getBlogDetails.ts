import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';

const fetchBlogDetails = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const useGetBlogDetails = (id: string) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.BLOGS.ALL, id],
    queryFn: () => fetchBlogDetails(id),
  });
};

export default useGetBlogDetails;
