'use client';

import { useQuery } from '@tanstack/react-query';
import Loading from '../../../app/loading';
import useGetUsers from '../../../api/queries/users/getUsers';

const Users = () => {
  const getUsersQuery = useGetUsers();
  const { data, isLoading, isError } = useQuery(getUsersQuery);

  if (isLoading) return <Loading />;
  if (isError) return <div>Sorry, There was an Error</div>;

  return (
    <div>
      {data.map((user: any) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default Users;
