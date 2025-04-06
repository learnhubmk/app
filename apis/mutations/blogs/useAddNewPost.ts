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

export const useAddNewPost = (onSuccess?: (data: any, post: NewPost) => void) => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (newPost: NewPost) =>
      axios.post(ENDPOINTS.BLOGS.CREATE, newPost).then((response) => response.data),

    onSuccess: (data, variables) => {
      toast.success('Статијата беше успешно објавена!');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });

      onSuccess?.(data, variables);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || 'Настана грешка при креирање на статијата.');
    },
  });
};

export default useAddNewPost;
