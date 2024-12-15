'use client';

import React, { ReactElement } from 'react';
import useLogout from '../../../apis/mutations/login/useLogout';

interface LogoutButtonProps {
  redirectUrl: string;
  className?: string;
  icon?: ReactElement;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ redirectUrl, className, icon }) => {
  const logout = useLogout(redirectUrl);

  return (
    <button type="button" onClick={() => logout.mutate()} className={className}>
      {icon}
      Logout
    </button>
  );
};

export default LogoutButton;
