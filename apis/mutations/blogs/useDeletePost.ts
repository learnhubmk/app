'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  interface ErrorResponse {
    message?: string;
  }

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await axios.delete(ENDPOINTS.BLOGS.DELETE(postId));
      return response.data;
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
      toast.error(error?.response?.data?.message || 'Настана грешка при бришење на постот');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
      toast.success('Постот беше успешно избришан.');
    },
  });
};

export default useDeletePost;
