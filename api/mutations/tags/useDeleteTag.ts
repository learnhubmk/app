'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';

const useDeleteTag = () => {
  const axios = useAxios();

  interface ErrorResponse {
    message?: string;
  }

  return useMutation({
    mutationFn: async (tagId: string) => {
      const response = await axios.delete(`${ENDPOINTS.TAGS.DELETE}/${tagId}`);
      return response.data;
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || 'Настана грешка при бришење на тагот');
    },
  });
};

export default useDeleteTag;
