import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';
import { ErrorResponse } from '../../../Types';

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: async ({ id, updatedPost }: { id: string; updatedPost: any }) => {
      return await axios.put(ENDPOINTS.BLOGS.UPDATE(id), updatedPost);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || 'Настана грешка при креирање на статијата.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
      toast.success('Статијата беше успешно објавена!');
    },
  });
};

export default useUpdatePost;
