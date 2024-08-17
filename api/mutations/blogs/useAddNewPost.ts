'use client';

import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';

type NewPost = {
  title: string;
  body: string;
  userId: number;
};

const useAddNewPost = () => {
  const axios = useAxios();

  return useMutation({
    mutationFn: async (newPost: NewPost) => {
      const response = await axios.post(ENDPOINTS.BLOGS.CREATE, newPost);
      return response.data;
    },
  });
};

export default useAddNewPost;
