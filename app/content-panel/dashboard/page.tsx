'use client';

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div>
      content dashboard
      {session ? (
        <div>
          <h1>Welcome back, {session.user?.name}</h1>
          <div>
            <button type="button" onClick={() => signOut()}>
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <Link href="/content-panel/login">Go to Login</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
