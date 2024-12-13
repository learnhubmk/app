import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';
import { ErrorResponse } from '../../../components/reusable-components/_Types';

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: async ({ id, updatedPost }: { id: string; updatedPost: any }) => {
      console.log('Attempting to update post with ID:', id);
      console.log('Update payload:', updatedPost);
      return axios.patch(ENDPOINTS.BLOGS.UPDATE(id), updatedPost);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error('Update post error:', error.response?.data);
      toast.error(error?.response?.data?.message || 'Настана грешка при ажурирање на статијата.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
      toast.success('Статијата беше успешно ажурирана!');
    },
  });
};

export default useUpdatePost;
