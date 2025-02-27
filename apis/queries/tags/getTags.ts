import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';
import { TagObject } from '../../../components/module-components/blog/TagInput';

export interface Tag {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface MetaData {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface TagsResponse {
  data: Tag[];
  links: Links;
  meta: MetaData;
}

const useGetTags = (search?: string, page?: number) => {
  const axios = useAxios();

  return useQuery({
    queryKey: [...QUERY_KEYS.TAGS.ALL, search, page],
    queryFn: async () => {
      const url = `${ENDPOINTS.TAGS.GET_ALL}?search=${encodeURIComponent(search || '')}&page=${encodeURIComponent(page || 1)}`;

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
  });
};

export default useGetTags;
