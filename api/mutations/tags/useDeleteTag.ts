'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';

const useDeleteTag = () => {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.error(error?.response?.data?.message || 'Настана грешка при бришење на тагот');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.success('Тагот беше успешно избришан.');
    },
  });
};

export default useDeleteTag;
