'use client';

import { useQuery } from '@tanstack/react-query';
import getUsers from '../../../app/getUsers';

const Users = () => {
  const { data, isLoading, isError } = useQuery({
    // eslint-disable-next-line no-return-await
    queryFn: async () => await getUsers(),
    queryKey: ['users'],
  });

  if (isLoading) return <div>Loading</div>;
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
