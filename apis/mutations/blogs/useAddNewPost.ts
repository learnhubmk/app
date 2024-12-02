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
};

type ErrorResponse = {
  message: string;
  statusCode?: number;
};

const useAddNewPost = () => {
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
      toast.success('Статијата беше успешно објавена!');
    },
  });
};

export default useAddNewPost;
