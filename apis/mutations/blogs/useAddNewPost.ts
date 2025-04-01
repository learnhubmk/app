'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';

export type NewPost = {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: string;
};

type ErrorResponse = {
  message: string;
  statusCode?: number;
};

const useAddNewPost = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: async (newPost: NewPost) => {
      const response = await axios.post(ENDPOINTS.BLOGS.CREATE, newPost);
      return response.data;
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || 'Настана грешка при креирање на статијата.');
    },
    onSuccess: () => {
      toast.success('Статијата беше успешно објавена!');
      onSuccess?.();
      // Invalidate queries after showing success message
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
      }, 100);
    },
  });
};

export default useAddNewPost;
