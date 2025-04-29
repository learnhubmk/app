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
  tags: string[];
  status?: string;
  image?: File;
};
type ErrorResponse = {
  message: string;
  statusCode?: number;
};
const useEditBlogPost = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  return useMutation({
    mutationFn: async ({ id, title, content, tags, status, image }: UpdatePostPayload) => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      tags.forEach((tag) => formData.append('tags[]', tag));

      // Always add the image field to FormData (even if it's undefined)
      if (image) {
        formData.append('image', image);
      }

      const editResponse = await axios.patch(ENDPOINTS.BLOGS.EDIT(id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (status !== undefined) {
        await axios.patch(ENDPOINTS.BLOGS.UPDATE_STATUS(id), { status });
      }

      return editResponse.data;
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || 'Настана грешка при ажурирање на статијата.');
    },
    onSuccess: () => {
      toast.success('Статијата беше успешно ажурирана!');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
    },
  });
};
export default useEditBlogPost;
