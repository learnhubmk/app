'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';

const useDeleteTag = () => {
  const axios = useAxios();

  return useMutation({
    mutationFn: async (tagId: string) => {
      const response = await axios.delete(`${ENDPOINTS.TAGS.DELETE}/${tagId}`);
      return response.data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Настана грешка при бришење на тагот');
    },
  });
};

export default useDeleteTag;
