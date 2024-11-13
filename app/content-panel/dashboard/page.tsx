import React from 'react';
import LogoutButton from '../../../components/reusable-components/button/LogoutButton';

const Dashboard = async () => {
  return (
    <div>
      content dashboard
      <LogoutButton redirectUrl="/content-panel/login" />
    </div>
  );
};

export default Dashboard;
