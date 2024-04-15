'use client';

import { useQuery } from '@tanstack/react-query';
import getUsers from '../../../app/getUsers';
import Loading from '../../../app/loading';

const Users = () => {
  const { data, isLoading, isError } = useQuery({
    // eslint-disable-next-line no-return-await
    queryFn: async () => await getUsers(),
    queryKey: ['users'],
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Sorry, There was an Error</div>;
  return (
    <div>
      {data.map((user: any) => {
        return <div>{user.name}</div>;
      })}
    </div>
  );
};

export default Users;
