import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';
import { TagObject } from '../../../components/module-components/blog/TagInput';
import { Links, MetaData } from '../../../Types';

export interface Tag {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface TagsResponse {
  data: Tag[];
  links: Links;
  meta: MetaData;
}

const useGetTags = (search?: string, page?: number, itemsPerPage?: number) => {
  const axios = useAxios();

  return useQuery({
    queryKey: [...QUERY_KEYS.TAGS.ALL, search, page, itemsPerPage],
    queryFn: async () => {
      const url = `${ENDPOINTS.TAGS.GET_ALL}?search=${encodeURIComponent(search || '')}&page=${encodeURIComponent(page || 1)}&per_page=${encodeURIComponent(itemsPerPage)}`;

      const { data } = await axios.get<TagsResponse>(url);
      return data;
    },
    select: (data) => ({
      ...data,
      data: data.data.map((tag: TagObject) => ({
        ...tag,
        name: tag.name.toLowerCase(),
      })),
    }),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export default useGetTags;
