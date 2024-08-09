import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';

const useGetUsers = () => {
  const axios = useAxios();

  return {
    queryKey: QUERY_KEYS.USERS.ALL,
    queryFn: async () => {
      const { data } = await axios.get(ENDPOINTS.USERS.GET_ALL);
      return data;
    },
  };
};

export default useGetUsers;
