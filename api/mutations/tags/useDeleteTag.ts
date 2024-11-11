'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';

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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TAGS.ALL });
      toast.error(error?.response?.data?.message || 'Настана грешка при бришење на тагот');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TAGS.ALL });
      toast.success('Тагот беше успешно избришан.');
    },
  });
};

export default useDeleteTag;
