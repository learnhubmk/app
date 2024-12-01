'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

const LogoutButton = ({ redirectUrl }: { redirectUrl: string }) => {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: redirectUrl })}>
      Logout
    </button>
  );
};

export default LogoutButton;
