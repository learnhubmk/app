'use client';

import { useSession } from 'next-auth/react';
import LogoutButton from '../../components/reusable-components/button/LogoutButton';

const page = () => {
  const { data: session } = useSession();
  return (
    <div>
      <LogoutButton redirectUrl="/content-panel/login" />
      <div>Content Panel {JSON.stringify(session?.user)}</div>
    </div>
  );
};

export default page;
