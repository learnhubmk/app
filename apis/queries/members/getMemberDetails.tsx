import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '../../queryKeys';
import ENDPOINTS from '../../endpoints';
import { MemberDetailsResponse, TransformedMember } from './types';
import transformedMemberData from './transformMemberDetailsResponse';
import { useAxios } from '../../AxiosProvider';

const useGetMemberDetails = (userId: string, initialData: TransformedMember) => {
  const axios = useAxios();

  return useQuery({
    queryKey: [...QUERY_KEYS.MEMBERS.ONE, userId],
    queryFn: async () => {
      const { data } = await axios.get<MemberDetailsResponse>(
        `${ENDPOINTS.MEMBERS.GET_ONE}/${userId}`
      );
      return transformedMemberData(data.data);
    },
    initialData,
  });
};

export default useGetMemberDetails;
