'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';

type UpdatePostPayload = {
  id: string;
  title: string;
  content: string;
  tags: number[];
  status: string;
};

type ErrorResponse = {
  message: string;
  statusCode?: number;
};

const useEditBlogPost = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: async ({ id, title, content, tags, status }: UpdatePostPayload) => {
      const editResponse = await axios.patch(ENDPOINTS.BLOGS.EDIT(id), {
        title,
        content,
        tags,
      });

      const statusResponse = await axios.patch(`${ENDPOINTS.BLOGS.UPDATE_STATUS(id)}`, {
        status,
      });

      return {
        editData: editResponse.data,
        statusData: statusResponse.data,
      };
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || 'Настана грешка при ажурирање на статијата.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
      toast.success('Статијата беше успешно ажурирана!');
    },
  });
};

export default useEditBlogPost;
