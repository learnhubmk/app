'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';

type UpdatePostStatusPayload = {
  id: string;
  status: string;
};

type ErrorResponse = {
  message: string;
  statusCode?: number;
};

const useUpdatePostStatus = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: async ({ id, status }: UpdatePostStatusPayload) => {
      const response = await axios.patch(ENDPOINTS.BLOGS.UPDATE_STATUS(id), { status });
      return response.data;
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error?.response?.data?.message || 'Настана грешка при ажурирање на статусот на статијата.'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
      toast.success('Статусот на статијата е успешно ажуриран!');
    },
  });
};

export default useUpdatePostStatus;
