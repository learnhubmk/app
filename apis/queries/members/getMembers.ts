import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';
import { transformMembersResponse } from './transformMembersResponse';
import buildMembersUrl from './buildMembersUrl';
import { MemberResponse } from './types';

const useGetMembers = (
  { initialData }: { initialData: MemberResponse },
  paginationPage: number,
  sort: {
    sortDirection: string;
    sortBy: string;
  },
  search: string
) => {
  const axios = useAxios();

  return useQuery({
    queryKey: [...QUERY_KEYS.MEMBERS.ALL, paginationPage, sort, search],
    queryFn: async () => {
      const url = buildMembersUrl(ENDPOINTS.MEMBERS.GET_ALL, paginationPage, sort, search);
      const { data } = await axios.get<MemberResponse>(url);
      return transformMembersResponse(data);
    },
    initialData,
  });
};

export default useGetMembers;
