'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';

type TagName = {
  name: string;
};

const useAddNewTag = () => {
  const axios = useAxios();

  return useMutation({
    mutationFn: async (tagName: TagName) => {
      const response = await axios.post(ENDPOINTS.TAGS.CREATE, tagName);
      return response.data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred while adding the tag');
    },
  });
};

export default useAddNewTag;
