import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import fetchData from '../../../components/reusable-components/reusable-table/FetchData';
import { UserData } from '../../../components/reusable-components/reusable-table/TableRowComponent';

const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchData();
        const user = response.find((user: UserData) => user.id === id);
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (id) {
      fetchUserData();
    }
  }, [id]);

  return (
    <div>
      <h1>User Details</h1>
      {userData && (
        <>
          <p>
            <strong>First Name:</strong> {userData.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {userData.last_name}
          </p>
          <p>
            <strong>Role:</strong> {userData.role}
          </p>
        </>
      )}
    </div>
  );
};

export default UserDetailsPage;
