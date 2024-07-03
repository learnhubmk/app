'use client';

import { useSearchParams } from 'next/navigation';

const UsersPage = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('id');
  return <div>Users: {search}</div>;
};

export default UsersPage;
