'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';

const useEditTag = () => {
  const axios = useAxios();

  return useMutation({
    mutationFn: async ({ tagId, newName }: { tagId: string; newName: string }) => {
      console.log(newName);
      const response = await axios.patch(`${ENDPOINTS.TAGS.EDIT}/${tagId}`, { name: newName });
      return response.data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Настана грешка при изменување на тагот');
    },
  });
};

export default useEditTag;
