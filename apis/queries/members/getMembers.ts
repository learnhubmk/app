import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';
import { MemberResponse } from './types';
import { transformMembersResponse } from './transformMembersResponse';

const useGetMembers = (
  { initialData }: { initialData: MemberResponse },
  paginationPage: number
) => {
  const axios = useAxios();

  return useQuery({
    queryKey: [...QUERY_KEYS.MEMBERS.ALL, paginationPage],
    queryFn: async () => {
      const { data } = await axios.get<MemberResponse>(
        `${ENDPOINTS.MEMBERS.GET_ALL}?per_page=5&page=${paginationPage}`
      );
      return transformMembersResponse(data);
    },
    initialData,
  });
};

export default useGetMembers;
