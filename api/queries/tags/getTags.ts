import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';
import QUERY_KEYS from '../../queryKeys';

const useGetTags = () => {
  const axios = useAxios();

  return {
    queryKey: QUERY_KEYS.TAGS.ALL,
    queryFn: async () => {
      const { data } = await axios.get(ENDPOINTS.TAGS.GET_ALL);
      return data;
    },
  };
};

export default useGetTags;
