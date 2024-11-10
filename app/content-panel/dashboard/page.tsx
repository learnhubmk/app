import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '../../../utils/authOptions';
import LogoutButton from '../../../components/reusable-components/button/LogoutButton';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/content-panel/login');
  }
  const { user } = session;

  return (
    <div>
      content dashboard
      <div> User: {user.email}</div>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
