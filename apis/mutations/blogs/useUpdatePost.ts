import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';
import { ErrorResponse } from '../../../Types';
import { BlogDetailsData } from '../../../components/reusable-components/_Types';

interface UpdatePostParams {
  id: string;
  updatedPost: Partial<BlogDetailsData>;
}

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  const getAllPosts = useQuery<BlogDetailsData[], AxiosError>({
    queryKey: QUERY_KEYS.BLOGS.ALL,
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts`;
      const response = await axios.get(url);
      return response.data;
    },
  });

  if (getAllPosts.error) {
    toast.error('Настана грешка при вчитување на блог постовите.');
  }

  const updatePost = useMutation<void, AxiosError<ErrorResponse>, UpdatePostParams>({
    mutationFn: async ({ id, updatedPost }: UpdatePostParams) => {
      const { title, excerpt, slug, content, tags, authorId } = updatedPost;
      const formattedTags = Array.isArray(tags)
        ? tags
        : (tags as string | undefined)?.split(',').map((tag: string) => tag.trim());
      const postData = {
        authorId,
        title,
        excerpt,
        slug,
        content,
        tags: formattedTags,
      };
      await axios.put(ENDPOINTS.BLOGS.UPDATE(id), postData, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Настана грешка при ажурирање на статијата.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
      toast.success('Статијата беше успешно ажурирана!');
    },
  });

  return { getAllPosts, updatePost };
};

export default useUpdatePost;
