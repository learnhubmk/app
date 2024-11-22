import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';
import { MemberResponse } from './types';
import { transformMembersResponse } from './transformMembersResponse';

const useGetMembers = (
  { initialData }: { initialData: MemberResponse },
  paginationPage: number,
  sort: {
    sortDirection: string;
    sortBy: string;
  }
) => {
  const axios = useAxios();

  return useQuery({
    queryKey: [...QUERY_KEYS.MEMBERS.ALL, paginationPage, sort],
    queryFn: async () => {
      const { data } = await axios.get<MemberResponse>(
        `${ENDPOINTS.MEMBERS.GET_ALL}?per_page=5&page=${paginationPage}&sort_direction=${sort.sortDirection}&sort_by=${sort.sortBy}`
      );
      return transformMembersResponse(data);
    },
    initialData,
  });
};

export default useGetMembers;
