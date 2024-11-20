import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';
import { MemberResponse } from './types';
import { transformMembersResponse } from './transformMembersResponse';

const useGetMembers = ({ initialData }: { initialData: MemberResponse }) => {
  const axios = useAxios();

  return useQuery({
    queryKey: QUERY_KEYS.MEMBERS.ALL,
    queryFn: async () => {
      const { data } = await axios.get<MemberResponse>(ENDPOINTS.MEMBERS.GET_ALL);
      return transformMembersResponse(data);
    },
    initialData,
  });
};

export default useGetMembers;
