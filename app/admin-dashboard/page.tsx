/* eslint-disable no-unused-vars */
import React from 'react';
import ReusableTable from '../../components/reusable-components/reusable-table/ReusableTable';

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
}

const headers: (keyof UserData)[] = ['first_name', 'last_name', 'role'];
const displayNames: { [key in keyof UserData]?: string } = {
  first_name: 'First Name',
  last_name: 'Last Name',
  role: 'Role',
};

const fetchUrl = 'https://mocki.io/v1/ed331a85-c472-40e5-97eb-c15aedd6b8f2';

/* eslint-disable-next-line no-unused-vars */
const AdminDashboard = () => {
  return (
    <ReusableTable<UserData> headers={headers} displayNames={displayNames} fetchUrl={fetchUrl} />
  );
};

export default AdminDashboard;
