'use client';

import { useSession } from 'next-auth/react';
import LogoutButton from '../../components/reusable-components/button/LogoutButton';

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();
  return (
    <div>
      <LogoutButton redirectUrl="/content-panel/login" />
      <div>Content Panel {JSON.stringify(session?.user)}</div>
    </div>
  );
};

export default page;
