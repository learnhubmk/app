import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';
import { TagObject } from '../../../components/module-components/blog/TagInput';

const useGetTags = (search?: string) => {
  const axios = useAxios();

  return useQuery({
    queryKey: [...QUERY_KEYS.TAGS.ALL, search],
    queryFn: async () => {
      const url = search
        ? `${ENDPOINTS.TAGS.GET_ALL}?search=${encodeURIComponent(search)}`
        : ENDPOINTS.TAGS.GET_ALL;

      const { data } = await axios.get(url);
      return data;
    },
    select: (data) => ({
      ...data,
      data: data.data.map((tag: TagObject) => ({
        ...tag,
        name: tag.name.toLowerCase(),
      })),
    }),
  });
};

export default useGetTags;
