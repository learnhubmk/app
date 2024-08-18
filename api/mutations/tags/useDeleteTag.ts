'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';

type TagId = {
  name: string;
};

const useDeleteTag = () => {
  const axios = useAxios();

  return useMutation({
    mutationFn: async (tagId: TagId) => {
      const response = await axios.delete(`${ENDPOINTS.TAGS.DELETE}/${tagId}`);
      return response.data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred while deleting the tag');
    },
  });
};

export default useDeleteTag;
