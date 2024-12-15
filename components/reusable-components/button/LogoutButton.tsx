'use client';

import React from 'react';
import useLogout from '../../../apis/mutations/login/useLogout';

const LogoutButton = ({ redirectUrl }: { redirectUrl: string }) => {
  const logout = useLogout(redirectUrl);

  return (
    <button type="button" onClick={() => logout.mutate()}>
      Logout
    </button>
  );
};

export default LogoutButton;
