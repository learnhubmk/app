import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';
import { ErrorResponse } from '../../../Types';

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: async ({ id, updatedPost }: { id: string; updatedPost: any }) => {
      const { title, excerpt, slug, content, tags } = updatedPost;

      const formattedTags = Array.isArray(tags)
        ? tags
        : tags.split(',').map((tag: string) => tag.trim());

      const postData = {
        author_id: '6',
        title,
        excerpt,
        slug,
        content,
        tags: formattedTags,
      };

      // console.log('Updating post:', updatedPost);

      return axios.put(ENDPOINTS.BLOGS.UPDATE(id), postData, {
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      // console.error('Update post error:', error);
      // console.error('Error response:', error.response);
      toast.error(error?.response?.data?.message || 'Настана грешка при ажурирање на статијата.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
      toast.success('Статијата беше успешно ажурирана!');
    },
  });
};

export default useUpdatePost;
