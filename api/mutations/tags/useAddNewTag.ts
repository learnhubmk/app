'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';

const useAddNewTag = () => {
  const axios = useAxios();

  interface ErrorResponse {
    message?: string;
  }

  return useMutation({
    mutationFn: async ({ tagName }: { tagName: string }) => {
      const response = await axios.post(ENDPOINTS.TAGS.CREATE, { name: tagName });
      return response.data;
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || 'Настана грешка при додавање на тагот');
    },
  });
};

export default useAddNewTag;
