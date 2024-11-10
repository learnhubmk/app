'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: '/content-panel/login' })}>
      Logout
    </button>
  );
};

export default LogoutButton;
